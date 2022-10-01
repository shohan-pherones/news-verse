const newsContainer = document.querySelector(".news-container");

class News {
  #url = "https://newsdata.io/api/1/news?apikey=";
  #api_key = "pub_11835f25fa01c23c2bdf1dcc76bf60c25f1db";
  #language = "&language=en";

  constructor() {
    this._getNewsData();
    this._renderNews();
    this._renderError();
  }

  _getNewsData() {
    fetch(`${this.#url}${this.#api_key}${this.#language}`)
      .then((res) => res.json())
      .then((data) => this._renderNews(data.results))
      .catch((err) => this._renderError(err.message));
  }

  _renderNews(articles) {
    articles.forEach((article) => {
      const html = `
        <div class="p-4 md:w-1/3">
          <div
            class="h-full shadow-lg rounded-lg overflow-hidden"
          >
            <img
              class="lg:h-48 md:h-36 w-full object-cover object-center"
              src="${
                article.image_url ||
                "https://www.currys.co.uk/on/demandware.static/-/Sites-dcg-master-catalog/default/dwb66f74e6/images/no-image-found.png"
              }"
              alt="blog"
            />
            <div class="p-6">
              <h2
                class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
              >
                ${article.source_id}
              </h2>
              <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                ${article.title}
              </h1>
              <p class="leading-relaxed mb-3">
                ${article.description}
              </p>
              <div class="flex items-center flex-wrap justify-between">
                <a href="${article.link}" target="_blank"
                  class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                  >Read More
                  <svg
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
                <p class="leading-relaxed">
                ${this._getTime(new Date(article.pubDate))}
              </p>
              </div>
            </div>
          </div>
        </div>
      `;
      newsContainer.insertAdjacentHTML("beforeend", html);
    });
  }

  _renderError(errMsg) {
    newsContainer.insertAdjacentText("beforeend", errMsg);
  }

  _getTime(dateTime) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(dateTime);
  }
}

const newsVerse = new News();
