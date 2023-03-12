import { request } from '../api.js'

export default function HomePage ({ $target }) {
    const $home = document.createElement('div')

    this.render = () => {
        request('/products').then(products => {
            $home.innerHTML = `
                <h1>Home Page</h1>
                <ul>
                    ${product.map(product => `
                        <li>
                            <a class="link" href="/product/${product.id}">
                                ${product.name}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            `

        $target.appndChild($home)
        })
    }
}