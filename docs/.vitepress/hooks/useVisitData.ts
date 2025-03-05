// useVisitData.ts
/**
 * 网站访问量统计 hooks
 */
function useVisitData() {
    const script = document.createElement('script')
    script.defer = true
    script.async = true
    // 调用 Vercount 接口
    script.src = 'https://cn.vercount.one/js'
    // 调用 不蒜子 接口
    // script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
    document.head.appendChild(script)
}

export default useVisitData