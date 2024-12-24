<template>
    <div class="flex flex-wrap gap-10 justify-center items-center">
        <div class="mySwiper mb-10">
            <p class="text-2xl font-bold mb-4 text-primary">Side Project</p>
            <div class="shadow-md">
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
        <div class="flex flex-col items-center gap-10">
            <div class="card cursor-pointer rounded shadow-lg" @click="openPPT">
                <img class="w-full object-cover" src="@/assets/images/ppt.png" alt="IoT PTT Picture">
            </div>
            <div class="text-center">
                <a href="https://www.youtube.com/shorts/QSvdzqYWQKo" target="_blank" class="text-blue-500 hover:text-blue-700">
                    {{ t('Skill.SideProject.videoLink') }}
                </a>
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
    width: 500px;
    height: 450px;
}

.card {
    width: 500px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* 手機畫面調整 */
@media (max-width: 768px) {
    .mySwiper {
        width: 300px;
        /* 調整寬度 */
    }

    .card {
        width: 300px;
    }
}
</style>