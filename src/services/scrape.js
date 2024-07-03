import * as cheerio from "cheerio";
import pretty from "pretty";

const $ = cheerio.load(`<div class= "container">
    <h2 class="title">Hello worlsdsad</h2>
    <p>small</p>
    <p class="title">big</p>
    </div>`);

const a = $(".container").html();
console.log(a);
