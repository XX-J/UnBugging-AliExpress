
// ==UserScript==
// @name           Amendments for AliExpress
// @name:ru        Исправления AliExpress
// @version        1.7
// @description    Replacement of Russian links to the English site of their English-speaking counterparts. Disabling autotranslate comments to the goods in the English language.
// @description:ru Замена русскоязычных ссылок на англоязычном сайте их англоязычными аналогами. Отключение автоперевода комментариев к товарам на английский язык.
// @icon           https://ae01.alicdn.com/images/eng/wholesale/icon/aliexpress.ico
// @author         XX-J...
// @include        *://aliexpress.com/*
// @include        *://*.aliexpress.com/*
// @include        *://aliexpress.ru/store/*
// @include        *://*.aliexpress.ru/store/*
// ==/UserScript==


//    Меняем ссылки на англоязычные

function Replace(link) { if (/aliexpress.ru/i.test(link.href)) link.href = decodeURIComponent(link.href.replace('aliexpress.ru/','aliexpress.com/')); }
function SplitForReplace(links) { for (var i = 0; i < links.length; ++i) Replace(links[i]); }

document.addEventListener('DOMNodeInserted', function(event) {
  if (!event || !event.target || !(event.target instanceof HTMLElement)) return;
  if (event.target instanceof HTMLAnchorElement) Replace(event.target);
  SplitForReplace(event.target.getElementsByTagName('a'));
}, { passive: true });
SplitForReplace(document.getElementsByTagName('a'));


if (!localStorage.translate) localStorage.translate = ' N ';
if (localStorage.translate) {  //  Проверяем доступность localStorage

//    Отключаем перевод отзывов на английский

  if (/feedback.aliexpress.com/i.test(window.location)) {
    let Elem = document.querySelector('#translate'), Stor = localStorage.translate;
    if (Elem.value != Stor) {
    Elem.value = Stor;
    Elem.parentNode.submit();
    };
    document.querySelector('#cb-translate').onclick = () => { localStorage.translate = (Stor == ' N ') ? ' Y ' : ' N ' };
  };

//    Устанавливаем отображение 50-и заказов в списке заказов

}
