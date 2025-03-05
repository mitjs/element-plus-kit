<template>
    <div class="panel-container container">
        <div class="panel-group">
            <div class="text">
                <div>🎉本站总访问量</div>
                <span id="vercount_value_site_pv" class="font-bold">--</span>次
            </div>
            <div class="text">
                <div>🎢本站访客数</div>
                <span id="vercount_value_site_uv" class="font-bold">--</span>人次
            </div>
        </div>
    </div>

</template>
<style scoped>
.panel-container {
    border-top: 1px solid #e5e5e5;
    padding: 40px 0px 0;
    max-width: 1200px;
    margin: 40px auto 0;
}

.panel-group {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
    padding-top: 10px;
}

.panel-group .text {
    background-color: #f1f1f1;
    border-radius: 6px;
    padding: 15px 10px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: songti;
}

.font-bold {
    font-weight: bold;
    margin: 0 5px;
    color: #5672cd;
}
</style>