import style from '../style.css'
import React from 'react'
import {Button} from 'antd'
export const ManagerArticleCell = (props)=>(
    <div className={style.cellContainer}>
        <div className={style.cellAboutArticle}>
            <p className={style.articleTitle}>{props.data.title}</p>
            <p className={style.articleInfo}>
                <span>Author:{props.data.author}</span>
                <span>ViewCount:{props.data.viewCount}</span>
                <span>CommentCount:{props.data.commentCount}</span>
                <span>PublishTime:{props.data.time}</span>
            </p>
        </div>
        <div className={style.cellState}>
            <span>
                {props.data.isPublish?'Already':'Ready'}
            </span>
        </div>
        <div className={style.cellOperation}>
            <Button type='primary' icon="edit" onClick={()=>{props.edit_article(props.data._id);props.history.push('/admin/newArticle')}}>Edit</Button>
            <Button type='primary' icon="delete" onClick={()=>props.delete(props.data._id)}>Delete</Button>
            <Button type='primary' icon="eye-o" onClick={()=>{props.history.push(`/detail/${props.data._id}`,{id:props.data._id});props.getArticleDetail(props.data._id)}}>See</Button>
        </div>
    </div>
);