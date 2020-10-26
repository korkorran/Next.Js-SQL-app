import { useForm } from "react-hook-form";
import {useState} from 'react'
import Axios, { AxiosResponse } from 'axios'
import {PostWithAuthorInfo, NewPostResponse} from 'utils/types'

type FormData = {
  content: string;
};

type NewPostProps = {
  updatePosts : Function
}

const NewPost = ({updatePosts} : NewPostProps) => {
  const { register, handleSubmit, errors, reset } = useForm<FormData>();
  const [error, setError] = useState<string>(null)
  const [success, setSuccess] = useState<string>(null)

  const onSubmit = async (data : FormData) => {
    try {
      const response = await Axios.post<NewPostResponse>('api/post/new', data)
      setError(null)
      setSuccess('Message has been posted')
      updatePosts()
      reset()
    }
    catch (error) {
      setSuccess(null)
      if (error.response) {
        setError(error.response.data.response)
      } else if (error.request) {
        setError("Network error")
      } else {
        setError("Request error")
      }
    }
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='newpost' >
    

      <div className="field">
      <div className="control">
          <textarea
            className="textarea" 
            placeholder="Your message"
            rows={3}
            name="content"
            ref={register({ required: true })}
            >
          </textarea>
      </div>
      { errors.content && 
        <p className="help">Content is required</p>
      }
      </div>

      { error && 
        <div className="notification is-danger is-light">{error}</div>
      }
      { success && 
        <div className="notification is-success is-light">{success}</div>
      }

      <div className="field is-grouped is-grouped-centered">
      <div className="control">
        <input type="submit"  className="button is-success" value="Send Post"/>
      </div>
      </div>
    </form>
)}

export default NewPost;
