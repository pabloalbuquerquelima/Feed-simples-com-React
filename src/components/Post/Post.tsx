import styles from "./Post.module.css"
import { Avatar } from "../Avatar/Avatar"
import { Comment } from "../Comment/Comment"
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { useState, type FormEvent, type ChangeEvent, type InvalidEvent, } from "react"

interface Author {
    name: string;
    role: string;
    avatarUrl:string;
  }
  
  export interface PostType{
    id:number;
    author: Author;
    publishedAt: Date;
    content: Content[];
  }
  
  interface PostProps{
    post: PostType;
  }
  
  interface Content{
    type: 'paragraph' | 'link';
    content: string;
  }

export function Post({ post }:PostProps) {

    const [comments, setComments] = useState([
        'O melhor post!'
    ]);

    const [ newCommentText, setNewCommentText ] = useState('')
    const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'",{
        locale: ptBR,
    }) 

    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true,
        
    })

    const isNewCommentEmpty = newCommentText.length === 0

    function newCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault()
        setComments([...comments, newCommentText]);
        setNewCommentText('')
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Este campo é obrigatório')
    }

    function deleteComment(commentToDelete: string){
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete
        })
        setComments(commentsWithoutDeletedOne)
    }
    
    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={post.author.avatarUrl}></Avatar>
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
            </header>

            <div className={styles.content}>
                {post.content.map(line =>{
                    if(line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>
                    } else if (line.type === 'link'){
                        return <p key={line.content}><a href="#">{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.comentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea
                required
                onInvalid={handleNewCommentInvalid}
                name="comment"
                placeholder="Deixe seu comentário"
                value={newCommentText}
                onChange = {newCommentChange}
                />
                <footer>
                    <button type="submit" disabled={isNewCommentEmpty} >Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList} >
                {comments.map(comment => {
                    return (
                    <Comment 
                        key={comment} 
                        content={comment} 
                        onDeleteComment={deleteComment} 
                    />
                )
                })}
            </div>
        </article>
    )
}