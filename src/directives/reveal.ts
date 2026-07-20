import type { Directive, DirectiveBinding } from 'vue'

/**
 * v-reveal — 捲動進場指令
 *
 * 用法：
 *   v-reveal                          // 預設由下往上淡入
 *   v-reveal="'blur'"                 // 指定進場方式
 *   v-reveal="{ variant: 'left', delay: 120 }"
 *   v-reveal="{ stagger: 90 }"        // 對直屬子元素做接力進場
 *
 * 動畫本身寫在 assets/scss/base/motion.scss，這裡只負責在
 * 元素進入視窗時掛上 .is-revealed。
 */

type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur' | 'fade'

interface RevealOptions {
    variant?: RevealVariant
    /** 進場延遲（毫秒） */
    delay?: number
    /** 只播一次，離開視窗不重播。預設 true */
    once?: boolean
    /** 對直屬子元素依序延遲的間隔（毫秒） */
    stagger?: number
    /** 需露出多少比例才觸發，0–1。預設 0.12 */
    threshold?: number
}

const DEFAULTS: Required<Pick<RevealOptions, 'variant' | 'delay' | 'once' | 'threshold'>> = {
    variant: 'up',
    delay: 0,
    once: true,
    threshold: 0.12,
}

const optionsMap = new WeakMap<Element, RevealOptions>()
const observers = new Map<number, IntersectionObserver>()

function parse(binding: DirectiveBinding): RevealOptions {
    const v = binding.value
    if (typeof v === 'string') return { variant: v as RevealVariant }
    if (typeof v === 'number') return { delay: v }
    return { ...(v ?? {}) }
}

function markDone(el: HTMLElement) {
    // 動畫跑完就卸掉 will-change，長頁面才不會一直佔著合成層
    const clear = () => el.classList.add('reveal-done')
    el.addEventListener('transitionend', clear, { once: true })
    window.setTimeout(clear, 1600)
}

function getObserver(threshold: number): IntersectionObserver {
    const existing = observers.get(threshold)
    if (existing) return existing

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const el = entry.target as HTMLElement
                const opts = optionsMap.get(el) ?? {}
                const once = opts.once ?? DEFAULTS.once

                if (entry.isIntersecting) {
                    el.classList.add('is-revealed')
                    markDone(el)
                    if (once) observer.unobserve(el)
                } else if (!once) {
                    el.classList.remove('is-revealed', 'reveal-done')
                }
            })
        },
        {
            threshold,
            // 稍微晚一點觸發，讓元素進入視野後才動，而不是剛冒頭就播完
            rootMargin: '0px 0px -8% 0px',
        },
    )

    observers.set(threshold, observer)
    return observer
}

/** 瀏覽器不支援或使用者要求減少動態效果時，直接顯示最終狀態 */
function shouldSkip(): boolean {
    if (typeof window === 'undefined') return true
    if (!('IntersectionObserver' in window)) return true
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const vReveal: Directive<HTMLElement> = {
    mounted(el, binding) {
        const opts = { ...DEFAULTS, ...parse(binding) }
        optionsMap.set(el, opts)

        if (opts.stagger) {
            // 接力模式：父層只當容器，逐一標記子元素
            Array.from(el.children).forEach((child, i) => {
                const c = child as HTMLElement
                c.dataset.reveal = opts.variant
                c.style.setProperty('--reveal-delay', `${opts.delay + i * opts.stagger!}ms`)
                optionsMap.set(c, opts)
                if (shouldSkip()) c.classList.add('is-revealed', 'reveal-done')
                else getObserver(opts.threshold).observe(c)
            })
            return
        }

        el.dataset.reveal = opts.variant
        if (opts.delay) el.style.setProperty('--reveal-delay', `${opts.delay}ms`)

        if (shouldSkip()) {
            el.classList.add('is-revealed', 'reveal-done')
            return
        }

        getObserver(opts.threshold).observe(el)
    },

    unmounted(el) {
        const opts = optionsMap.get(el)
        const threshold = opts?.threshold ?? DEFAULTS.threshold
        const observer = observers.get(threshold)
        if (!observer) return

        observer.unobserve(el)
        Array.from(el.children).forEach((child) => observer.unobserve(child))
        optionsMap.delete(el)
    },
}

export default vReveal
