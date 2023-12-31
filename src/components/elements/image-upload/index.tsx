//@ts-nocheck
import { UploadService } from "@/services/file-upload";
import { useEffect, useRef, useState } from "react";

const ImagesUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [progressInfos, setProgressInfos] = useState({ val: [] });
  const [message, setMessage] = useState([]);
  const [imageInfos, setImageInfos] = useState([]);
  const progressInfosRef = useRef(null);

  console.log(imagePreviews);
  console.log(selectedFiles);

  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setImageInfos(response.data);
    });
  }, []);

  const uploadImages = () => {
    const files = Array.from(selectedFiles);

    let _progressInfos = files.map((file) => ({
      percentage: 0,
      fileName: file.name,
    }));

    console.log(progressInfosRef.current);

    progressInfosRef.current = {
      val: _progressInfos,
    };

    const uploadPromises = files.map((file, i) => upload(i, file));

    console.log(uploadPromises);

    Promise.all(uploadPromises)
      .then(() => UploadService.getFiles())
      .then((files) => {
        setImageInfos(files.data);
      });

    setMessage([]);
  };

  const upload = (idx, file) => {
    let _progressInfos: any = [...progressInfosRef.current.val];
    return UploadService.upload(file, (event) => {
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total,
      );
      setProgressInfos({ val: _progressInfos });
    })
      .then(() => {
        setMessage((prevMessage) => [
          ...prevMessage,
          "Uploaded the image successfully: " + file.name,
        ]);
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0;
        setProgressInfos({ val: _progressInfos });

        setMessage((prevMessage) => [
          ...prevMessage,
          "Could not upload the image: " + file.name,
        ]);
      });
  };

  const selectFiles = (event: any) => {
    let images: any = [];

    for (let i = 0; i < event.target.files.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]));
    }

    setSelectedFiles(event.target.files);
    setImagePreviews(images);
    setProgressInfos({ val: [] });
    setMessage([]);
  };

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <label className="p-0 btn btn-default">
            <input
              aria-label="image-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={selectFiles}
            />
          </label>
        </div>

        <div className="col-4">
          <button
            className="btn btn-success btn-sm"
            disabled={!selectedFiles}
            onClick={uploadImages}
          >
            Upload
          </button>
        </div>
      </div>

      {progressInfos &&
        progressInfos.val.length > 0 &&
        progressInfos.val.map((progressInfo, index) => (
          <div className="mb-2" key={index}>
            <span>{progressInfo.fileName}</span>
            <div className="progress">
              <div
                className="progress-bar progress-bar-info"
                role="aria-progressbar-name"
                aria-valuenow={progressInfo.percentage}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: progressInfo.percentage + "%" }}
              >
                {progressInfo.percentage}%
              </div>
            </div>
          </div>
        ))}

      {imagePreviews && (
        <div>
          {imagePreviews.map((img, i) => {
            return (
              <img className="preview" src={img} alt={"image-" + i} key={i} />
            );
          })}
        </div>
      )}

      {message.length > 0 && (
        <div className="mt-2 alert alert-secondary" role="alert">
          <ul>
            {message.map((item, i) => {
              return <li key={i}>{item}</li>;
            })}
          </ul>
        </div>
      )}
      {JSON.stringify(imagePreviews)}

      {imageInfos.length > 0 && (
        <div className="mt-3 card">
          <div className="card-header">List of Images</div>
          <ul className="list-group list-group-flush">
            {imageInfos &&
              imageInfos.map((img, index) => (
                <li className="list-group-item" key={index}>
                  <p>
                    <a href={img.url}>{img.name}</a>
                  </p>

                  <img src={img.url} alt={img.name} height="80px" />
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImagesUpload;
