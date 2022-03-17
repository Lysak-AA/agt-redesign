import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Public/Home.vue";
import Developing from "../views/Public/Developing.vue";
import Login from "../views/Public/Login.vue";
import Registration from "../views/Public/Registration.vue";
import Hotels from "../views/Public/Hotels.vue";
import Hotel from "../views/Public/Hotel.vue";
import Sanatories from "../views/Public/Sanatories.vue";
import Sanatory from "../views/Public/Sanatory.vue";
import AllTours from "../views/Public/AllTours.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/tourists",
    name: "Tourists",
    component: Developing
  },
  {
    path: "/agencies",
    name: "Agencies",
    component: Developing
  },
  {
    path: "/add-object",
    name: "Object",
    component: Developing
  },
  {
    path: "/safe-buy",
    name: "Buy",
    component: Developing
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/search",
    name: "Search",
    component: Developing
  },
  {
    path: "/all-tours",
    name: "AllTours",
    component: AllTours
  },
  {
    path: "/hotels",
    name: "Hotels",
    component: Hotels
  },
  {
    path: "/sanatories",
    name: "Sanatories",
    component: Sanatories
  },
  {
    path: "/sanatories/:id",
    name: "Sanatory",
    component: Sanatory
  },
  {
    path: "/hotels/:id",
    name: "Hotel",
    component: Hotel
  },
  {
    path: "/excursions",
    name: "Excursions",
    component: Developing
  },
  {
    path: "/active-tours",
    name: "ActiveTours",
    component: Developing
  },
  {
    path: "/service",
    name: "Service",
    component: Developing
  },
  {
    path: "/safe-buy",
    name: "SafeBuy",
    component: Developing
  },
  {
    path: "/early-booking",
    name: "EarlyBooking",
    component: Developing
  },
  {
    path: "/summer-2022",
    name: "Summer2022",
    component: Developing
  },
  {
    path: "/mountings-and-sea",
    name: "MountingsAndSea",
    component: Developing
  },
  {
    path: "/child-rest",
    name: "ChildRest",
    component: Developing
  },
  {
    path: "/covid-reabilitation",
    name: "CovidReabilitation",
    component: Developing
  },
  {
    path: "/credit-tours",
    name: "CreditTours",
    component: Developing
  },
  {
    path: "/actions-and-discounts",
    name: "ActionsAndDiscounts",
    component: Developing
  },
  {
    path: "/krd",
    name: "Krasnodar",
    component: Developing
  },
  {
    path: "/sochi",
    name: "Sochi",
    component: Developing
  },
  {
    path: "/adler",
    name: "Adler",
    component: Developing
  },
  {
    path: "/gelenjic",
    name: "Gelenjic",
    component: Developing
  },
  {
    path: "/anapa",
    name: "Anapa",
    component: Developing
  },
  {
    path: "/novorossiysk",
    name: "Novorossiysk",
    component: Developing
  },
  {
    path: "/abrua-durso",
    name: "AbruaDurso",
    component: Developing
  },
  {
    path: "/cremea",
    name: "Cremea",
    component: Developing
  },
  {
    path: "/krasnaya-polyana",
    name: "KrasnayaPolyana",
    component: Developing
  },
  {
    path: "/dombay",
    name: "Dombay",
    component: Developing
  },
  {
    path: "/prielbrusye",
    name: "Prielbrusye",
    component: Developing
  },
  {
    path: "/arhiz",
    name: "Arhiz",
    component: Developing
  },
  {
    path: "/sheregesh",
    name: "Sheregesh",
    component: Developing
  },
  {
    path: "/articles",
    name: "Articles",
    component: Developing
  },
  {
    path: "/article/:id",
    name: "Article",
    component: Developing
  },
  {
    path: "/to-hotels-and-operators",
    name: "ToHotelsAndOperators",
    component: Developing
  },
  {
    path: "/corporations",
    name: "Corporations",
    component: Developing
  },
  {
    path: "/income-and-outcome",
    name: "IncomeAndOutcome",
    component: Developing
  },
  {
    path: "/transfer",
    name: "Transfer",
    component: Developing
  },
  {
    path: "/covid-info",
    name: "CovidInfo",
    component: Developing
  },
  {
    path: "/popular-ways",
    name: "PopularWays",
    component: Developing
  },
  {
    path: "/top-of-tours",
    name: "TopOfTours",
    component: Developing
  },
  {
    path: "/best-offers",
    name: "BestOffers",
    component: Developing
  },
  {
    path: "/news",
    name: "News",
    component: Developing
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: Developing
  },
  {
    path: "/testimonials",
    name: "Testimonials",
    component: Developing
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
