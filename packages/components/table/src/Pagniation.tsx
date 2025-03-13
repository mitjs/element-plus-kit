import { ElPagination } from "element-plus";
import { defineComponent, type ExtractPropTypes, type PropType } from "vue";
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { isNumber } from "lodash-es";
// 创建一个新的类型，移除 readonly 修饰符  

const pageProps = Object.assign({},{
  pageSize: Number,
  defaultPageSize: {
    type: Number,
    required: false,
    default: 10,
  },
  total: Number,
  pageCount: {
    type: Number,
    default: 7,
  },
  pagerCount: {
    type: Number,
    validator: (value: unknown) => {
      return (
        isNumber(value) &&
        Math.trunc(value) === value &&
        value > 4 &&
        value < 22 &&
        value % 2 === 1
      )
    },
    default: 7,
  },
  currentPage: Number,
  defaultCurrentPage: {
    type: Number,
    validator: (value: unknown) => {
      return isNumber(value) && value > 0
    }
  },
  layout: {
    type: String,
    default: 'total,prev,pager,next,sizes,jumper',
  },
  pageSizes: {
    type: Array as PropType< number[]>,
    default: () => [10, 20, 30, 40, 50, 100],
  },
  popperClass: {
    type: String,
    default: '',
  },
  prevText: {
    type: String,
    default: '',
  },
  prevIcon: {
    type:  [String, Object,Function],
    default: () => ArrowLeft,
  },
  nextText: {
    type: String,
    default: '',
  },
  nextIcon: {
    type: [String, Object,Function],
    default: () => ArrowRight,
  },
  teleported: {
    type: Boolean,
    default: true,
  },
  small: Boolean,
  size: String as PropType<''|'default'|'small'|'large'>,
  background: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  hideOnSinglePage: {
    type: Boolean,
    required: false,
    default: false,
  },
})

export type QPaginationProps=  ExtractPropTypes<typeof pageProps> 
export default defineComponent({
    name: 'Pagniation',
    props: {
        page:{
            type:Object as PropType<Partial<QPaginationProps>>,
            default:()=>({currentPage:1,pageSize:10})
        }
    },
    emits: ['page-change','current-change','size-change'],
    setup(props, { emit }) {
        const {page}=props
        const currentChange=(currentPage:number)=>{
            emit("page-change", {currentPage,pageSize:page.pageSize}, "currentPage");
            emit('current-change',currentPage)
        }
        const sizeChange=(pageSize:number)=>{
            emit("page-change", {currentChange:page.currentPage,pageSize}, "pageSize");
            emit('size-change',pageSize)
        }
        return () => (<>
          <div class="quick-table-pagination">
            <ElPagination
                v-model:current-page={page.currentPage}
                v-model:page-size={page.pageSize}
                layout="total,prev,pager,next,sizes,jumper"
                background={true}
                {...(page as any)}
                onCurrent-change={currentChange}
                onSize-change={sizeChange}
            />
        </div>
        </>)
    }
})