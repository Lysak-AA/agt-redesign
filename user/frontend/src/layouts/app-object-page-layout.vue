<template>
    <div class="container">
        <main class="main">
            <slot name="main"></slot>
        </main>
        <aside class="aside">
            <slot name="aside"></slot>
        </aside>
    </div>
</template>

<style lang="scss" scoped>
    .container{
        display: grid;
        grid-template-columns: 70% 30%;
        width: min(100%, 1440px);
        margin-inline: auto;
    }
    .main{
        grid-column: 1 / 2;
    }
    .aside{
        grid-column: 2 / 3;
    }

    @media (max-width: 1024px) {
        .container{
            grid-template-columns: 100%;
            grid-template-rows: repeat(2, fit-content);
        }
        .main{
            grid-row: 1 / 2;
        }
        .aside{
            grid-column: 1 / 2;
            grid-row: 2 / 3;
            margin: 2rem 0;
        }
    }
</style>