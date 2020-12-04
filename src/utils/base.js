const api = {
    baseUrl:'http://localhost:3000/api/',

    type:{
        get:'type/get',
        add:'type/add',
        remove:'type/remove',
        update:'type/update',
        signle:'type/signle'
    },


    tag:{
        get:'tag/get',
        add:'tag/add',
        remove:'tag/remove',
        update:'tag/update',
        signle:'tag/signle'
    },
    
    user:{
        login:'user/login'
    },

    comment:{
        get:'comment/get',
        add:'comment/add',
    },
    
    
    blog:{
        get:'blog/get',
        add:'blog/add',
        remove:'blog/remove',
        update:'blog/update',
        signle:'blog/signle',
        select:'blog/select',
        publish:'blog/publish',
        tagId:'blog/tag_blog_one'

    }


}

export default api;