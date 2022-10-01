const newsContainer = document.querySelector(".news-container");

class News {
  URL =
    "https://newsapi.org/v2/everything?q=tesla&from=2022-09-01&sortBy=publishedAt&apiKey=";
  API_KEY = "8b38dc5dc8b1444b8652b344ddb53020";

  constructor() {
    this._getNewsData();
    this._renderNews();
    this._renderError();
  }

  _getNewsData() {
    fetch(`${this.URL}${this.API_KEY}`)
      .then((res) => {
        if (!res.ok) throw new Error("Unable to load data from the server...");
        return res.json();
      })
      .then((data) => this._renderNews(data.articles))
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
              src="${article.urlToImage}"
              alt="blog"
            />
            <div class="p-6">
              <h2
                class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
              >
                ${article.author}
              </h2>
              <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                ${article.title}
              </h1>
              <p class="leading-relaxed mb-3">
                ${article.description}
              </p>
              <div class="flex items-center flex-wrap justify-between">
                <a href="${article.url}" target="_blank"
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
                ${this._getTime(new Date(article.publishedAt))}
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
