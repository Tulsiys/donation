import React from 'react';

class ImageLoader extends React.Component {
    // constructor(props) {
    //     super(props);

    // this.onload = this.onload.bind(this);
    // }

    // onload(e) {
    //     console.log('image onload', new Date());
    // }

    render() {
        let file;
        // let ext = this.props.src?.substr(this.props.src.lastIndexOf('.'));
        // ext.match(/jpg|jpeg|png|svg/gi) &&

        if (this.props.type?.toLowerCase() === 'image') {
            file = <img src={this.props.src} /* onLoad={this.onload} */ alt={this.props.alt ?? ''} id={this.props.id ?? ''} />
            // ext.match(/mp3|mp4/gi) &&
        } else if (this.props.type?.toLowerCase() === 'video') {
            file = <video width="100%" height="100%" loop autoPlay muted playsInline><source src={this.props.src} type="video/mp4" />Your browser does not support the video tag.</video>;
        }

        return (
            <>
                {file}
            </>
        );
    }
}

export default ImageLoader;