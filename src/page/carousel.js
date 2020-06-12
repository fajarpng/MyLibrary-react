import React from 'react';
import gambar1 from '../asets/cover01.jpg'
import gambar2 from '../asets/cover02.jpg'
import gambar3 from '../asets/cover03.jpg'
import gambar from '../asets/covernya.jpg'
import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: gambar1,
    key: '1'
  },
  {
    src: gambar2,
    key: '2'
  },
  {
    src: gambar3,
    key: '3'
  },
  {
    src: gambar,
    key: '4'
  }
];

const Slider = () => <UncontrolledCarousel items={items} />;

export default Slider;