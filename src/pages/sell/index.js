import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Img,
  Input,
  Textarea,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { createRef, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sell = () => {
  const [values, setValues] = useState({
    name: '',
    image: null,
    page: '',
    price: '',
    description: '',
    author: '',
    publisher: '',
    category: '',
  });
  const handleValuesChange = (key, value) => {
    setValues(_values => ({
      ..._values,
      [key]: value,
    }));
  };
  const userToEdit = null;
  const imgSrc = useMemo(() => {
    const defaultSrc =
      userToEdit?.avatarSrc?.sm ??
      'https://via.placeholder.com/720x720/CBD5E0/718096';

    return values.image ? URL.createObjectURL(values.image) : defaultSrc;
  }, [userToEdit, values.image]);
  const inputFileRef = createRef();
  const handleImageChange = () => {
    inputFileRef.current?.click();
  };

  const handleInputFileChange = e => {
    if (e.currentTarget.files?.[0]) {
      handleValuesChange('image', e.currentTarget.files?.[0]);
    }
  };

  const handleSubmit = async () => {
    const payload = new FormData();

    payload.append('name', values.name);
    payload.append('author', values.author);
    payload.append('category', values.category);
    payload.append('price', values.price);
    payload.append('publisher', values.publisher);
    payload.append('description', values.description);
    payload.append('image', values.image);
    try {
      // await axios.patch(`/cms/blog/posts/${postId}`, payload);
      await axios.post('http://localhost:5000/store/products', payload);
    } catch (error) {
      console.log(error);
    } finally {
      console.log('produk berhasil diterbitkan');
    }
  };

  return (
    <>
      <Grid
        gap={6}
        gridTemplateColumns={['', 'repeat(2, 1fr)']}
        bgColor={'white'}
        p={3}
        borderRadius={2}
        height="100%"
      >
        <Box>
          <FormControl isRequired>
            <FormLabel htmlFor="name">Book Name</FormLabel>
            <Input
              id="name"
              placeholder="Name"
              value={values.name}
              onChange={e => handleValuesChange('name', e.currentTarget.value)}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="page">Total page</FormLabel>
            <Input
              id="page"
              placeholder="page"
              value={values.page}
              onChange={e => handleValuesChange('page', e.currentTarget.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="author">Author</FormLabel>
            <Input
              id="author"
              placeholder="author"
              value={values.author}
              onChange={e =>
                handleValuesChange('author', e.currentTarget.value)
              }
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="publisher">Publisher</FormLabel>
            <Input
              id="publisher"
              placeholder="publisher"
              value={values.publisher}
              onChange={e =>
                handleValuesChange('publisher', e.currentTarget.value)
              }
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="price">Price</FormLabel>
            <Input
              id="price"
              placeholder="Example : 10000"
              value={values.price}
              onChange={e => handleValuesChange('price', e.currentTarget.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="category">category</FormLabel>
            <Input
              id="category"
              placeholder="category"
              value={values.category}
              onChange={e =>
                handleValuesChange('category', e.currentTarget.value)
              }
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              placeholder="Description"
              value={values.description}
              onChange={e =>
                handleValuesChange('description', e.currentTarget.value)
              }
              required
            />
          </FormControl>
        </Box>
        <Box>
          <input
            ref={inputFileRef}
            type="file"
            style={{ display: 'none' }}
            accept="images/*"
            onChange={handleInputFileChange}
          />

          <FormLabel htmlFor="picture-produk">Book image</FormLabel>

          <Img
            cursor={'pointer'}
            onClick={handleImageChange}
            src={imgSrc}
            objectPosition={'center'}
            objectFit="contain"
            backgroundColor={'gray.300'}
            height={[32, 40]}
            style={{
              aspectRatio: '1/1',
            }}
            borderRadius={6}
          />
        </Box>
      </Grid>
      <Flex
        justifyContent={'flex-end'}
        gap={4}
        bgColor={'white'}
        boxShadow={'md'}
        my={3}
        py={3}
        pr={4}
      >
        <Button bgColor={'red.500'} color={'white'} as={NavLink} to={'/'}>
          {'Cancel'}
        </Button>
        <Button onClick={handleSubmit} color={'white'} bgColor={'blue.500'}>
          {'Save'}
        </Button>
      </Flex>
    </>
  );
};

export default Sell;
