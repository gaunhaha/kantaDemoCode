/**
 * 工作經歷的結構定義。
 *
 * 內容依 2025 版履歷（陳冠旗）重寫。這裡只存「結構」與 i18n key，
 * 實際文案在 core/plugins/i18n/{zh_tw,en}.json，模板只負責渲染。
 * 要新增或調整一份經歷，改這個檔案即可。
 */

/** 一段文字；需要外連時用物件形式，id 供 GA 事件追蹤 */
export type Text = string | { key: string; href: string; id?: string }

export interface Entry {
    /** 這筆項目的標題 */
    titleKey?: string
    /** 標題本身是連結時使用 */
    titleLink?: { href: string; id?: string }
    /** 標題底下的說明段落 */
    texts?: Text[]
}

export interface Section {
    /** 小節標題，例如「負責專案」「團隊角色」 */
    headingKey?: string
    entries: Entry[]
}

export interface Job {
    /** i18n 底下的索引，對應 Skill.WorkExperience.<key> */
    key: string
    /** 是否為進行中的工作，會顯示狀態點 */
    current?: boolean
    introKey?: string
    sections: Section[]
}

const B = 'Skill.WorkExperience'

/**
 * 產生連號的 i18n key。
 * seq('X.text', 3)  → ['X.text1', 'X.text2', 'X.text3']
 * seq('X.item.', 2) → ['X.item.1', 'X.item.2']
 * 分隔符直接寫在 prefix 結尾，兩種命名慣例都能覆蓋。
 */
const seq = (prefix: string, count: number): string[] =>
    Array.from({ length: count }, (_, i) => `${prefix}${i + 1}`)

/** 一個「有標題 + 數個條列」的專案區塊 */
const project = (
    job: string,
    p: string,
    itemCount: number,
    link?: { href: string; id?: string },
): Entry => ({
    titleKey: `${B}.${job}.${p}.title`,
    titleLink: link,
    texts: seq(`${B}.${job}.${p}.item`, itemCount),
})

/** 一個「有標題 + 單段說明」的專案區塊 */
const brief = (job: string, p: string, link?: { href: string; id?: string }): Entry => ({
    titleKey: `${B}.${job}.${p}.title`,
    titleLink: link,
    texts: [`${B}.${job}.${p}.text`],
})

export const jobs: Job[] = [
    // Momentx — 資深前端工程師
    {
        key: '1',
        current: true,
        introKey: `${B}.1.intro`,
        sections: [
            {
                headingKey: `${B}.1.projectsTitle`,
                entries: [
                    project('1', 'p1', 5),
                    project('1', 'p2', 3),
                    project('1', 'p3', 2, {
                        href: 'https://www.momentx.ai/',
                        id: 'work-experience-momentx-button',
                    }),
                    project('1', 'p4', 3),
                ],
            },
            {
                headingKey: `${B}.1.teamRoleTitle`,
                entries: [{ texts: seq(`${B}.1.teamRole.item`, 3) }],
            },
        ],
    },

    // 創造智能科技
    {
        key: '2',
        sections: [
            {
                headingKey: `${B}.2.respTitle`,
                entries: [{ texts: seq(`${B}.2.resp.item`, 8) }],
            },
            {
                headingKey: `${B}.2.opsTitle`,
                entries: [{ texts: seq(`${B}.2.ops.item`, 3) }],
            },
            {
                headingKey: `${B}.2.projectsTitle`,
                entries: [
                    brief('2', 'p1', {
                        href: 'https://www.ntpcluckytemple.tw/zh-TW',
                        id: 'work-experience-ntpcluckytemple-button',
                    }),
                    brief('2', 'p2', {
                        href: 'https://www.aicreate360.com/',
                        id: 'work-experience-aicreate360-button',
                    }),
                    brief('2', 'p3'),
                    { titleKey: `${B}.2.p4.title` },
                ],
            },
        ],
    },

    // 勤禾科技服務
    {
        key: '3',
        sections: [
            {
                headingKey: `${B}.3.respTitle`,
                entries: [{ texts: seq(`${B}.3.resp.item`, 5) }],
            },
            {
                headingKey: `${B}.3.projectsTitle`,
                entries: [brief('3', 'p1'), brief('3', 'p2'), brief('3', 'p3'), brief('3', 'p4')],
            },
        ],
    },

    // 日晷科技
    {
        key: '4',
        sections: [
            {
                headingKey: `${B}.4.respTitle`,
                entries: [{ texts: seq(`${B}.4.resp.item`, 4) }],
            },
            {
                headingKey: `${B}.4.projectsTitle`,
                entries: [brief('4', 'p1'), brief('4', 'p2'), brief('4', 'p3')],
            },
        ],
    },

    // 精誠資訊
    {
        key: '5',
        sections: [
            {
                headingKey: `${B}.5.respTitle`,
                entries: [{ texts: seq(`${B}.5.resp.item`, 3) }],
            },
        ],
    },

    // 優貝克軟體研發（履歷未列，屬早期經歷，保留）
    {
        key: '6',
        sections: [{ entries: [{ texts: seq(`${B}.6.Responsibilities.`, 2) }] }],
    },

    // 接案（時間橫跨整段職涯，放在最後）
    {
        key: '0',
        current: true,
        sections: [{ entries: [{ texts: seq(`${B}.0.text`, 3) }] }],
    },
]
