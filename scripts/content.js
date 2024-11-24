// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const article = document.querySelector('article');

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  const text = article.textContent;
  /**
   * Regular expression to find all "words" in a string.
   *
   * Here, a "word" is a sequence of one or more non-whitespace characters in a row. We don't use the
   * regular expression character class "\w" to match against "word characters" because it only
   * matches against the Latin alphabet. Instead, we match against any sequence of characters that
   * *are not* a whitespace characters. See the below link for more information.
   *
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
   */
  const wordMatchRegExp = /[^\s]+/g;
  const words = text.matchAll(wordMatchRegExp);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement('p');
  // Use the same styling as the publish information in an article's header
  badge.classList.add('color-secondary-text', 'type--caption');
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector('h1');
  // Support for article docs with date
  const date = article.querySelector('time')?.parentNode;

  // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
  (date ?? heading).insertAdjacentElement('afterend', badge);
}

function getout() {
  const getouturl = "https://i-viaplay-com.akamaized.net/viaplay-prod/22/792/1504101650-d9ec8b24ef8005710f40f16ba090ea1db9d29e29.jpg?width=1600&height=900"
  window.location.href = getouturl;
}

const MINIMUM_TIME_S =  60*5;

function fuckshorts() {
  var list = document.querySelectorAll('[aria-label="Shorts"], [title="Shorts"], ytd-reel-shelf-renderer');

  if (list.length > 0) {
    list.forEach(s => s.remove());
    
    setTimeout(fuckshorts, 50)
  }


  list = document.querySelectorAll("ytd-rich-section-renderer");
  list.forEach(s => {
    let del = false;
    s.querySelectorAll("#title").forEach(t => del ||= (t.innerHTML == "Shorts") );
    if (del) {
      s.remove();
    }
  });

  list = document.querySelectorAll("ytd-rich-item-renderer");
  
  list.forEach(vid => {
    let time = vid.querySelector(".badge-shape-wiz__text");
    if (!time) {
      return;
    }
    let splat = time.innerHTML.split(":");
    if (splat.length > 1) { 
      let time_s = time.innerHTML
        .split(":").reverse()
        .map(v=>parseInt(v))
        .map((v,i) => v*(60**i))
        .reduce((a,b) => a+b);
      if(time_s < MINIMUM_TIME_S) {
        vid.remove();
      }
    } 
    else {

    }
  })

  if (window.location.href.includes("/shorts/")) {
    getout();
  }
  setTimeout(fuckshorts, 5000)
}

fuckshorts();