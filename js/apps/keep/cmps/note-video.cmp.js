import noteTxt from './note-text.cmp.js'
import noteTodo from './note-todo.cmp.js'

export default {
    props: ["keep"],
    template: `
        <section>
          <li class="note-video flex flex-col justify-center align-center">
            <video :src="keep.info.url" controls></video>
          </li>
          <note-todo v-if="keep.isTodo" :keep="keep"/>
          <note-txt v-else :keep="keep"/>
        </section>
          `,
    components: {
        noteTxt,
        noteTodo,
    }
}

