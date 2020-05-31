import { createApp} from './app';
export default context =>{

    return new Promise((resolve,reject)=>{

        const {app,router,store} = createApp();
        router.push(context.url);
        router.onReady(()=>{
            const components = router.getMatchedComponents();
            if(!components.length){
                return reject({code:404});
            }
            //预拉取数据
            Promise.all(components.map(c=>{
                if(c.asyncData){
                    return c.asyncData({
                        store,
                        route:router.currentRoute
                    });
                }
            })).then(()=>{
                context.state = store.state
            });
            resolve(app);
        },reject)
    });
}