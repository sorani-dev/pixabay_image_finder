
import { Dialog,FlatButton } from 'material-ui'
import GridList from 'material-ui/GridList'
import GridTile from 'material-ui/GridList/GridTile'
import IconButton from 'material-ui/IconButton'
import { white } from 'material-ui/styles/colors'
import ActionZoomIn from 'material-ui/svg-icons/action/zoom-in'
import PropTypes from 'prop-types'
import { useState } from 'react'

const ImageResults = ({ images }) => {

    const [open,setOpen] = useState(false)
    const [currentImage,setCurrentImage] = useState({ url: '',alt: '' })

    const handleOpen = img => {
        setOpen(true)
        const newImage = {
            url: img.largeImageURL,
            alt: altImage(img.pageURL)
        }
        setCurrentImage(newImage)
    }

    const handleClose = e => {
        setOpen(false)
        setCurrentImage(null)
    }
    /**
     * Get an alternate text for the image
     * @param {string} url page url of the image
     * @returns 
     */
    const altImage = url => url.split('/')[url.split('/').length - 2]

    const imageListContent = images ? (
        <GridList cols={3}>
            {images.map(image => <GridTile
                title={image.tags}
                key={image.id}
                subtitle={<span>
                    by <strong>{image.user}</strong>
                </span>
                }
                actionIcon={
                    <IconButton onClick={() => handleOpen(image)}>
                        <ActionZoomIn color={white} />
                    </IconButton>
                }
            >
                <img src={image.largeImageURL} alt={altImage(image.pageURL)} />
            </GridTile>)
            }
        </GridList>
    ) : null

    const actions = [
        <FlatButton label='close' primary={true} onClick={handleClose} />
    ]

    return (
        <div>
            {imageListContent}
            <Dialog
                actions={actions}
                modal={false}
                open={open}
                onRequestClose={handleClose}
            >
                <img src={currentImage.url} alt={currentImage.alt} style={{ width: '100%' }} />
            </Dialog>
        </div>
    )
}

ImageResults.propTypes = {
    images: PropTypes.array.isRequired,
}

export default ImageResults
