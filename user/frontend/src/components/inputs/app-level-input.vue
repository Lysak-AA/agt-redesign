<template>
    <div class="level">
        <svg 
            class="level-star"
            viewBox="0 0 36 36"
            v-for="(star, index) in stars"
            :key="index"
            :fill="star.fill"
            @click="selectLevel(index, star.id)" >
            <path d="M34.4028 15.548L34.414 15.5392C34.6512 15.354 34.8342 15.0899 34.9291 14.7788C35.0241 14.4673 35.0236 14.1313 34.9279 13.8202C34.8322 13.5095 34.6485 13.2459 34.411 13.0614C34.1741 12.8776 33.8944 12.7802 33.6112 12.7754L33.6 12.7752L33.5888 12.7747L23.8143 12.3878L23.798 12.3872L23.7817 12.386C23.5311 12.3679 23.2957 12.2744 23.1033 12.1231C22.9118 11.9727 22.7719 11.7726 22.6938 11.551L34.4028 15.548ZM34.4028 15.548L34.3918 15.5571L26.6993 21.9235C26.5043 22.0802 26.3648 22.2892 26.2916 22.5192C26.2173 22.7527 26.2128 23.0029 26.2781 23.2386L28.9379 33.0667L28.9394 33.0723C29.0243 33.379 29.0163 33.7066 28.9169 34.0077C28.8179 34.3077 28.6354 34.5604 28.4024 34.7362C28.168 34.9103 27.8935 35 27.617 35C27.3398 35 27.0646 34.9098 26.8298 34.7348L26.8185 34.7264L26.807 34.7183L18.7085 29.0308C18.5025 28.8842 18.2537 28.8024 17.9946 28.8024C17.7354 28.8024 17.4867 28.8842 17.2806 29.0308L9.18211 34.7183L9.17749 34.7216C8.93842 34.8915 8.6608 34.9767 8.3821 34.9722C8.10336 34.9676 7.82783 34.8734 7.59316 34.6951C7.3578 34.5164 7.17369 34.2603 7.07384 33.9568C6.97389 33.653 6.96552 33.3226 7.05041 33.013L7.05156 33.0087L9.69068 23.2106L9.69077 23.2106L9.69421 23.1971C9.75281 22.9668 9.74585 22.7242 9.67365 22.4972C9.60137 22.27 9.46496 22.063 9.27439 21.9059L9.274 21.9056L1.60645 15.5897L1.59632 15.5814L1.58598 15.5733C1.3488 15.3882 1.16578 15.124 1.07091 14.8129C0.975942 14.5015 0.97638 14.1655 1.07213 13.8544C1.16779 13.5436 1.35145 13.28 1.58903 13.0956C1.82587 12.9117 2.10563 12.8143 2.38878 12.8095L2.40001 12.8093L2.41122 12.8089L12.1857 12.4219L12.202 12.4213L12.2183 12.4201C12.4689 12.402 12.7043 12.3085 12.8967 12.1573C13.0886 12.0064 13.2288 11.8057 13.3068 11.5835L13.307 11.5832L16.6737 1.98994L16.6743 1.98826C16.7792 1.68782 16.9668 1.43631 17.2041 1.26253C17.4406 1.08926 17.7165 1 17.9946 1C18.2726 1 18.5486 1.08926 18.7851 1.26253C19.0223 1.43631 19.21 1.68782 19.3148 1.98826L19.3161 1.99195L22.6932 11.5493L34.4028 15.548Z" />
        </svg>
    </div>
</template>

<script>
import { mapState } from "vuex";
    export default {
        props: {
            objects: {
                type: String,
                default: "hotels"
            }
        },
        computed: mapState({
            isStarsActive: state => state.hotelFilterOptions.stars.is_active,
            isSanatoryStarsActive: state => state.sanatoryFilterOptions.stars.is_active
        }),
        watch: {
            isStarsActive(){
                if(this.objects === 'hotels'){
                    this.isStarsActive ? false : this.dropLevel();
                }
            },
            isSanatoryStarsActive(){
                if(this.objects === 'sanatories'){
                    this.isSanatoryStarsActive ? false : this.dropLevel();
                }
            }
        },
        data: () => {
            return {
                stars: [
                    {
                        id: 1,
                        fill: 'none'
                    },
                    {
                        id: 2,
                        fill: 'none'
                    },
                    {
                        id: 3,
                        fill: 'none'
                    },
                    {
                        id: 4,
                        fill: 'none'
                    },
                    {
                        id: 5,
                        fill: 'none'
                    },
                ],
                level: null
            }
        },
        methods: {
            selectLevel(index, id){
                this.stars.forEach((star, i) => {
                    i <= index ?
                        star.fill = '#FF9A0D' :
                        star.fill = 'none';
                });
                this.level = id;
                this.$emit('action', this.level)
            },
            dropLevel(){
                this.stars.forEach(star => star.fill = 'none');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .level{
        padding: 1rem 0;
        display: flex;
        width: 100%;
        &-star{
            width: 36px;
            height: 36px;
            cursor: pointer;
            stroke: $accent;
            stroke-width: 2;
            margin-right: 15px;
        }
    }
</style>