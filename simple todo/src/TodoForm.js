export default function TodoForm({ $target, onSubmit }) {
    const $form = document.createElement('form')

    $target.appendChild($form)

    let isInit = false

    this.render = () => {
        $form.innerHTML = `
            <input type="text" name="todo">
            <button>Add</button>
        `

        if (!isInit) {
            $form.addEventListener('submit', e => {
                e.preventDefault()

                const text = $form.querySelector('input[name=todo]').value
                console.log(text)
                onSubmit(text)
            })
            isInit = true
        }
}
    this.render()
}
