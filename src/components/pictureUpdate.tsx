import { useForm } from "react-hook-form";
import {useState} from 'react'
import Axios, { AxiosResponse } from 'axios'
import {User, UpdatePictureResponse} from 'utils/types'
import { mutate } from 'swr'

type Data = {
  file: FileList;
};

type UpdatePictureProps = {
  pictureUrl : string
}

const UpdatePicture = ({pictureUrl} : UpdatePictureProps) => {
  const { register, handleSubmit, errors, watch } = useForm<Data>();
  const [error, setError] = useState<string>(null)
  const [success, setSuccess] = useState<string>(null)
  const watchFilename = watch()
  const onSubmit = async (data : Data) => {
    try {
      const formData = new FormData()
      formData.append('picture', data.file[0])
      const response = await Axios.post<UpdatePictureResponse>('api/user/updatePicture', formData)
      setError(null)
      setSuccess('Picture has been updated')
      mutate('/api/user/me', async (axiosResponse : AxiosResponse<User>) => {
        axiosResponse.data.profilePictureURL = response.data.pictureURL
        return axiosResponse;
      }, false)
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

    <>
      <div 
        className="bigAvatar" 
        style={{ backgroundImage: `url("${
          pictureUrl ? pictureUrl  : '/undraw_male_avatar_323b.svg'
        }")`}} 
        />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
        <div className="control">
          <div className="file has-name is-boxed">
            <label className="file-label">
              <input 
                className="file-input" 
                type="file" 
                name="file" 
                ref={register({ required: true })}
                />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">
                  Choose a file…
                </span>
              </span>
              <span className="file-name">
                {watchFilename?.file?.length > 0 ? watchFilename.file[0].name : ''}
              </span>
            </label>
          </div>

        </div>
        { errors.file && 
          <p className="help">file is required</p>
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
          <input type="submit"  className="button is-success" value="Change"/>
        </div>
        </div>
      </form>
    </>
)}

export default UpdatePicture;
