<template>
    <section class="top-offers">
        <h3 class="section-title">подборка топовых предложений</h3>
        <div class="top-offers-articles-list">
            <div class="first-article article" :style="`background-image: url(./img/${articles[0].image})`">
                <h4 class="article__title">{{ articles[0].title }}</h4>
                <router-link :to="`/article/${articles[0].id}`" class="article__link"></router-link>
            </div>
            <div class="second-article article" :style="`background-image: url(./img/${articles[1].image})`">
                <h4 class="article__title">{{ articles[1].title }}</h4>
                <router-link :to="`/article/${articles[1].id}`" class="article__link"></router-link>
            </div>
            <div class="third-article article" :style="`background-image: url(./img/${articles[2].image})`">
                <h4 class="article__title">{{ articles[2].title }}</h4>
                <router-link :to="`/article/${articles[2].id}`" class="article__link"></router-link>
            </div>
            <div class="fourth-article article" :style="`background-image: url(./img/${articles[3].image})`">
                <h4 class="article__title">{{ articles[3].title }}</h4>
                <router-link :to="`/article/${articles[3].id}`" class="article__link"></router-link>
            </div>
        </div>
        <router-link to="/articles" class="more-articles">
            <span>Все статьи</span>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_53_113)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18 33.75C22.1772 33.75 26.1832 32.0906 29.1369 29.1369C32.0906 26.1832 33.75 22.1772 33.75 18C33.75 13.8228 32.0906 9.81677 29.1369 6.86307C26.1832 3.90937 22.1772 2.25 18 2.25C13.8228 2.25 9.81677 3.90937 6.86307 6.86307C3.90937 9.81677 2.25 13.8228 2.25 18C2.25 22.1772 3.90937 26.1832 6.86307 29.1369C9.81677 32.0906 13.8228 33.75 18 33.75ZM18 2.14648e-07C22.7739 2.71576e-07 27.3523 1.89642 30.7279 5.27208C34.1036 8.64773 36 13.2261 36 18C36 22.7739 34.1036 27.3523 30.7279 30.7279C27.3523 34.1036 22.7739 36 18 36C13.2261 36 8.64773 34.1036 5.27208 30.7279C1.89642 27.3523 1.5772e-07 22.7739 2.14648e-07 18C2.71576e-07 13.2261 1.89642 8.64773 5.27208 5.27208C8.64773 1.89642 13.2261 1.5772e-07 18 2.14648e-07ZM10.125 16.875C9.82663 16.875 9.54048 16.9935 9.32951 17.2045C9.11853 17.4155 9 17.7016 9 18C9 18.2984 9.11853 18.5845 9.32951 18.7955C9.54048 19.0065 9.82663 19.125 10.125 19.125L23.1593 19.125L18.3285 23.9535C18.1173 24.1647 17.9986 24.4513 17.9986 24.75C17.9986 25.0487 18.1173 25.3353 18.3285 25.5465C18.5397 25.7577 18.8263 25.8764 19.125 25.8764C19.4237 25.8764 19.7103 25.7577 19.9215 25.5465L26.6715 18.7965C26.7763 18.692 26.8594 18.5679 26.9161 18.4312C26.9728 18.2945 27.002 18.148 27.002 18C27.002 17.852 26.9728 17.7055 26.9161 17.5688C26.8594 17.4321 26.7763 17.308 26.6715 17.2035L19.9215 10.4535C19.7103 10.2423 19.4237 10.1236 19.125 10.1236C18.8263 10.1236 18.5397 10.2423 18.3285 10.4535C18.1173 10.6647 17.9986 10.9513 17.9986 11.25C17.9986 11.5487 18.1173 11.8353 18.3285 12.0465L23.1593 16.875L10.125 16.875Z" fill="#3E444F"/>
                </g>
                <defs>
                <clipPath id="clip0_53_113">
                <rect width="36" height="36" fill="white" transform="translate(0 36) rotate(-90)"/>
                </clipPath>
                </defs>
            </svg>
        </router-link>
    </section>
</template>

<script>
    export default {
        setup(){
            const articles = [
                {
                    id: 1,
                    title: "Топ 10 курортов Краснодарского края",
                    image: 'first-article-pic.png'
                },
                {
                    id: 2,
                    title: "Топ 5 отелей у моря",
                    image: 'second-article-pic.png'
                },
                {
                    id: 3,
                    title: "Топ 7 экскурсионных туров",
                    image: 'third-article-pic.png'
                },
                {
                    id: 4,
                    title: "Топ 3 вариантов отдыха в горах",
                    image: 'fourth-article-pic.png'
                }
            ];

            return {
                articles
            }
        }
    }
</script>

<style lang="scss" scoped>
    .top-offers{
        padding: 3.125rem 0;
        width: min(98%, 1728px);
        margin-inline: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        &-articles-list{
            padding: 3.125rem 0;
            display: grid;
            width: min(100%, 1280px);
            height: 640px;
            margin-inline: auto;
            grid-template-columns: 2fr 1fr 1fr;
            grid-template-rows: repeat(2, 1fr);
            grid-gap: 2.5rem;
            
        }
        .first-article{
            grid-column: 1 / 2;
            grid-row: 1 / 3;
        }
        .second-article{
            grid-column: 2 / 4;
            grid-row: 1 / 2;
        }
    }
    .article{
        background-color: $primary;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        transition: 0.3s ease;
        cursor: pointer;
        position: relative;
        &__link{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 100;
        }
        &:hover{
            transform: scale(1.05);
            -webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
            -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
            box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
        }
        &__title{
            text-align: center;
            font-size: 180%;
            color: white;
            font-weight: 700;
            filter: drop-shadow(5px 5px 1px #000000);
        }
    }
    .more-articles{
        display: flex;
        align-items: center;
        font-size: 2.25rem;
        font-weight: 700;
        text-transform: uppercase;
        text-decoration: none;
        color: $title;
        span{
            margin-right: 1rem;
        }
    }

    @media screen and (max-width: 920px) {
        .top-offers{
            &-articles-list{
                width: 80%;
                height: auto;
                margin-inline: auto;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                
            }
        }
        .article{
            background-color: $primary;
            border-radius: 20px;
            width: min(100%, 400px);
            height: 250px;
        }
        .more-articles{
            font-size: 1.8rem;
        }
    }
</style>