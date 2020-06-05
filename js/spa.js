const SPA = (id, route) => {

    const a_elements = document.querySelectorAll('[data-router]')
    const content = document.querySelector(`#${id}`)
    const baseUrl = '/spa'

    a_elements.forEach(element => element.addEventListener('click', clickLink));

    function clickLink(ev) {
        ev.preventDefault()
        const href = ev.target.getAttribute('data-router')
        console.log(href);

        if (href == getCurrentPath()) return;
        const rota = getRota(href)
        if (rota) {
            carregar(rota)
            history.pushState({ rota }, rota.title, baseUrl + rota.path)
        }
    }

    function getRota(path) {
        const r = route.filter(rota => rota.path === path)[0]
        return r || null
    }

    async function carregar({ page, title }) {
        const url = `${baseUrl}/pages/${page}.html?${new Date().getMilliseconds()}`
        document.title = title
        const response = await fetch(url)
        content.innerHTML = await response.text()
    }

    function getCurrentPath() {
        const pathname = window.location.pathname
        return pathname.substring(baseUrl.length, pathname.length);
    }

    function init() {
        const currentPath = getCurrentPath()
        const r = route.filter(rota => rota.path === currentPath)[0]
        if (!r) return;
        carregar(r)
    }
    init()


    window.addEventListener('popstate', init)
}

export default SPA