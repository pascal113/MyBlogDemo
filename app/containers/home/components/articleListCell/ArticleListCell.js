import React from 'react'
import style from './style.css'
import test1 from '../../../../../static/1.jpg'
import test2 from '../../../../../static/2.jpg'
import test3 from '../../../../../static/3.jpg'
import test4 from '../../../../../static/4.jpg'
import {Link} from 'react-router-dom'

export const ArticleListCell = (props)=>(
    <div className={`${style.container} `} onClick={()=>{props.history.push(`/detail/${props.data._id}`,{id:props.data._id});props.getArticleDetail(props.data._id)}}>
        <div>
            <img src={props.data.coverImg} alt=""/>
        </div>
        <div className={style.bottomContainer}>
            <p className={style.title}>
                {props.data.title}
            </p>
            <p className={style.summary}>
                Need add database
            </p>
            <div>
                <p>
                    <span>
                        <img src={require('./calendar.png')} alt="Publish"/>
                        {props.data.time}
                    </span>
                    <span>
                        <img src={require('./views.png')} alt="ViewCount"/>
                        {props.data.viewCount}
                    </span>
                    <span>
                        <img src={require('./comments.png')} alt="CommentCount"/>
                        {props.data.commentCount}
                    </span>
                </p>
                <span className={style.lastSpan}>
                    ReadAll <span>》</span>
                </span>
            </div>
        </div>
    </div>
);