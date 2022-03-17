import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/styles/styles.scss";

//подключаем lodash

import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";


// настраиваем автоподключение компонентов

const requireComponent = require.context('./components/base-components', false, /Base[A-Z]\w+\.(vue|js)$/);

// создаем приложение vue
const app = createApp(App);

requireComponent.keys().forEach(fileName => {
    const componentCongig = requireComponent(fileName);

    const componentName = upperFirst(
        camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
    )

    app.component(componentName, componentCongig.default || componentCongig)
})

app.use(store).use(router).mount("#app");
