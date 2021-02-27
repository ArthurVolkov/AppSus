export default {
    props: ["keep"],
    template: `
        <li class="note-text flex flex-col grow" :style="{backgroundColor: keep.style.backgroundColor}">
            <p v-for="(row, idx) in keep.info.txts.length" :key="idx" :ref="idx" @keydown="newLine($event, idx)" type="text" :class="{'is-selected': keep.info.txts[idx].doneAt && keep.isTodo}" >{{keep.info.txts[idx].txt}}</p>
        </li>
          `,
}
