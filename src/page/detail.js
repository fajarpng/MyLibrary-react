import React, {Component} from 'react'
import cover from '../asets/cover.png'
class Register extends Component{
    render(){
        return(
            <>
                <div class="detail-top">
                    <div class="nav">
                        <div class="back"></div>
                    </div>
                    <div class="cover">
                        <img src={cover} alt="cover" />
                    </div>
                </div>
                <div class='detail-bot'>
                    <div class="contain-left">
                        <div class="category">Novel</div>
                        <div class="judul">Dilan 1990</div>
                        <div class="status">Available</div>
                        <div class="date">30 Juni 2019 </div>
                        <div class="desc">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac diam eget est rutrum ultrices. Donec laoreet enim a massa dapibus, cursus egestas dui pulvinar. Proin sit amet accumsan lectus. Nullam auctor auctor consequat. Donec semper magna erat, sed fringilla lacus pretium eget. Cras porttitor, nibh sit amet interdum bibendum, nibh velit accumsan tellus, vel vehicula tellus leo vitae ipsum. Praesent sit amet libero sed orci ullamcorper efficitur. Pellentesque in euismod purus, sit amet ultrices tortor. Vestibulum ante dui, tempor at dui id, tincidunt euismod diam. Integer pellentesque massa nibh, ac eleifend odio malesuada sed. Phasellus orci sem, cursus nec orci ut, accumsan facilisis lacus. Nullam at elementum nibh, ac gravida felis. In sagittis rhoncus nisi tempus dignissim. Sed fringilla consequat ante vitae lobortis. Cras posuere ligula vel enim suscipit malesuada. Vivamus non nulla ut ante imperdiet euismod quis nec massa.
                        </div>
                    </div>
                    <div class="contain-right">
                        <button class="borrow">Borrow</button>
                    </div>
                </div>
            </>
        )
    }
}

export default Register