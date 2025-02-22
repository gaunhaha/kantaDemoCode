<template>
    <p class="text-2xl font-bold mb-4 text-primary">Side Project</p>
    <div class="flex flex-wrap justify-center items-start gap-10">
        <!-- 輪播圖區塊：黃色到青色 -->
        <div class="flex-shrink-0">
            <div class="bg-gradient-to-br from-yellow-500 via-green-500 to-teal-500 rounded-lg p-1 mb-8 transition-all duration-300 hover:shadow-xl max-w-4xl mx-auto">
                <div class="bg-gray-50 w-full rounded-lg">
                    <swiper :loop="true" :modules="[Autoplay, Pagination]" :pagination="{ clickable: true }"
                        :slides-per-view="1" :space-between="10" :autoplay="{ delay: 5000, disableOnInteraction: false }"
                        class="mySwiper rounded-lg bg-white">
                        <swiper-slide>
                            <div class="">
                                <img class="w-full object-cover" src="@/assets/images/iot.webp" alt="IoT Picture">
                                <div class="px-6 py-4">
                                    <div class="font-bold text-xl mb-2">{{ t('Skill.SideProject.1.title') }}</div>
                                    <p class="text-gray-700 text-base">
                                        {{ t('Skill.SideProject.1.text1') }}
                                    </p>
                                    <p class="text-gray-700 text-base">
                                        {{ t('Skill.SideProject.1.text2') }}
                                    </p>
                                    <p class="text-gray-700 text-base">
                                        @arduino @C/C++
                                    </p>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div>
                                <img class="w-full object-cover" src="@/assets/images/Raspberry Pi.webp"
                                    alt="Backend Picture">
                                <div class="px-6 py-4">
                                    <div class="font-bold text-xl mb-2">{{ t('Skill.SideProject.2.title') }}</div>
                                    <p class="text-gray-700 text-base">
                                        {{ t('Skill.SideProject.2.text1') }}
                                    </p>
                                    <p class="text-gray-700 text-base">
                                        {{ t('Skill.SideProject.2.text2') }}
                                    </p>
                                    <p class="text-gray-700 text-base">
                                        @node.js
                                    </p>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div>
                                <img class="w-full object-cover" src="@/assets/images/mysql.webp" alt="Database Picture">
                                <div class="px-6 py-4">
                                    <div class="font-bold text-xl mb-2">{{ t('Skill.SideProject.3.title') }}</div>
                                    <p class="text-gray-700 text-base">
                                        {{ t('Skill.SideProject.3.text1') }}
                                    </p>
                                    <p class="text-gray-700 text-base">
                                        {{ t('Skill.SideProject.3.text2') }}
                                    </p>
                                    <p class="text-gray-700 text-base">
                                        @SQL
                                    </p>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div>
                                <img class="w-full object-cover" src="@/assets/images/frontend.webp" alt="Frontend Picture">
                                <div class="px-6 py-4">
                                    <div class="font-bold text-xl mb-2">{{ t('Skill.SideProject.4.title') }}</div>
                                    <p class="text-gray-700 text-base">
                                        {{ t('Skill.SideProject.4.text1') }}
                                    </p>
                                    <p class="text-gray-700 text-base">
                                        {{ t('Skill.SideProject.4.text2') }}
                                    </p>
                                    <p class="text-gray-700 text-base">
                                        @jquery@ajax
                                    </p>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div>
                                <img class="w-full object-cover" src="@/assets/images/Line Notify.webp"
                                    alt="Line Notify Picture">
                                <div class="px-6 py-4">
                                    <div class="font-bold text-xl mb-2">{{ t('Skill.SideProject.5.title') }}</div>
                                    <p class="text-gray-700 text-base">
                                        {{ t('Skill.SideProject.5.text1') }}
                                    </p>
                                    <p class="text-gray-700 text-base">
                                        {{ t('Skill.SideProject.5.text2') }}
                                    </p>
                                    <p class="text-gray-700 text-base">
                                        {{ t('Skill.SideProject.5.text3') }}
                                    </p>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div>
                                <img class="w-full object-cover" src="@/assets/images/android app.webp"
                                    alt="Android App Picture">
                                <div class="px-6 py-4">
                                    <div class="font-bold text-xl mb-2">{{ t('Skill.SideProject.6.title') }}</div>
                                    <p class="text-gray-700 text-base">
                                        {{ t('Skill.SideProject.6.text1') }}
                                    </p>
                                    <p class="text-gray-700 text-base">
                                        {{ t('Skill.SideProject.6.text2') }}
                                    </p>
                                    <p class="text-gray-700 text-base">
                                        @Kotlin
                                    </p>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
        </div>
        <div class="flex-shrink-0 flex flex-col gap-4">
            <!-- PPT 區塊：青色到藍色 -->
            <div class="flex-shrink-0">
                <div class="card cursor-pointer rounded shadow-lg" @click="openPPT">
                    <div class="bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 rounded-lg p-1 mb-8 transition-all duration-300 hover:shadow-xl max-w-4xl mx-auto">
                        <div class="bg-gray-50 w-full rounded-lg">
                            <img class="w-full object-cover rounded-lg" src="@/assets/images/ppt.png" alt="IoT PTT Picture">
                        </div>
                    </div>
                </div>
            </div>
            <!-- 影片區塊：藍色到紫色 -->
            <div class="flex-shrink-0">
                <div class="bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 rounded-lg p-1 mb-8 transition-all duration-300 hover:shadow-xl max-w-4xl mx-auto">
                    <div class="video-container">
                        <iframe src="https://www.youtube.com/embed/QSvdzqYWQKo" title="Side Project Demo"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen class="rounded-lg shadow-lg"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { Autoplay, Pagination } from 'swiper/modules';
import i18n from "@/core/plugins/i18n/i18n.ts";
const { t } = i18n.global;
function openPPT() {
    window.open('https://drive.google.com/file/d/1o1MDiMTCexrtpT7J4hqhsgpwWNF8k60A/view', '_blank');
}
</script>
<style scoped>
.mySwiper {
    width: 400px;
    height: 450px;
}

.card {
    width: 400px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.video-container {
    width: 400px;
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    margin: 0 auto;
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

/* 手機畫面調整 */
@media (max-width: 1280px) {

    .mySwiper,
    .card,
    .video-container {
        width: 300px;
    }

    .mySwiper {
        height: 400px;
    }

    .video-container {
        padding-bottom: 75%;
        /* 調整影片容器比例 */
    }
}

/* 更小螢幕的調整 */
@media (max-width: 640px) {
    .video-container {
        width: 280px;
        padding-bottom: 65%;
        /* 進一步調整影片容器比例 */
    }
}
</style>