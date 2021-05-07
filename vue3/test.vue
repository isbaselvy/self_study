import { ref, onBeforeUpdate } from 'vue'
export default {
    setup() {
        let itemRefs = []
        const setItemRefs = el => {
            itemRefs.push(el)
        }
        onBeforeUpdate(()=>{
            itemRefs = []
        })
        return {
            itemRefs,
            setItemRefs
        }
    }
}