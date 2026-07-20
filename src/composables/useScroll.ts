import { onMounted, onUnmounted, ref } from 'vue'

/**
 * 共用的捲動狀態。
 * 全站只掛一組 scroll / resize 監聽（passive + rAF 節流），
 * 各元件共享同一份數值，避免每個元件各自 addEventListener。
 */

const scrollY = ref(0)
const progress = ref(0) // 0–1，整份文件的捲動進度
const isScrolled = ref(false) // 捲過 50px
const isScrollingUp = ref(false)

let listeners = 0
let ticking = false
let lastY = 0

function measure() {
    const y = window.scrollY || 0
    const max = document.documentElement.scrollHeight - window.innerHeight

    scrollY.value = y
    progress.value = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0
    isScrolled.value = y > 50
    isScrollingUp.value = y < lastY
    lastY = y
    ticking = false
}

function onScroll() {
    if (ticking) return
    ticking = true
    requestAnimationFrame(measure)
}

export function useScroll() {
    onMounted(() => {
        if (listeners === 0) {
            window.addEventListener('scroll', onScroll, { passive: true })
            window.addEventListener('resize', onScroll, { passive: true })
            measure()
        }
        listeners++
    })

    onUnmounted(() => {
        listeners--
        if (listeners === 0) {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
        }
    })

    return { scrollY, progress, isScrolled, isScrollingUp }
}

/**
 * 滑鼠位置（相對視窗中心，範圍約 -0.5 ~ 0.5）。
 * 給 Hero 的光暈做輕微跟隨用；觸控裝置不啟用。
 */
export function usePointer() {
    const px = ref(0)
    const py = ref(0)
    let frame = 0

    const onMove = (e: MouseEvent) => {
        if (frame) return
        frame = requestAnimationFrame(() => {
            px.value = e.clientX / window.innerWidth - 0.5
            py.value = e.clientY / window.innerHeight - 0.5
            frame = 0
        })
    }

    onMounted(() => {
        if (window.matchMedia('(pointer: fine)').matches) {
            window.addEventListener('mousemove', onMove, { passive: true })
        }
    })

    onUnmounted(() => {
        window.removeEventListener('mousemove', onMove)
        if (frame) cancelAnimationFrame(frame)
    })

    return { px, py }
}
