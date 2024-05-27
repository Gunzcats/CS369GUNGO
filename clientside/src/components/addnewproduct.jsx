import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Description, Field, Fieldset, Input, Label, Legend, Select, Textarea, Button,Dialog, DialogPanel, Transition} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { XMarkIcon } from '@heroicons/react/24/outline'

function AddNewProduct() {
    const [open, setOpen] = useState(true)
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthContext();
  const [product, setProduct] = useState({
    name: '',
    image: '',
    price: '',
    productDescription: '', // เพิ่ม field productDescription
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setProduct({ ...product, image: e.target.files[0] }); // เก็บไฟล์รูปภาพ
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", product.image);
      console.log(product.image)
      const res = await axios.post("/api/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    console.log(imgUrl)
    try {
        const token = localStorage.getItem('token');
        console.log(product.image)
        await axios.post('/api/products', {
          name:product.name,
          image:imgUrl,
          price:product.price,
          description:product.productDescription
        }, {
           
            headers: { 
                      'Authorization': `Bearer ${token}`
            } // กำหนด header
          });

          // Redirect to Home
    navigate('/'); 

    // handle success
    alert('เพิ่มสินค้าสำเร็จ');
    setProduct({
      name: '',
      image: null,
      price: '',
      productDescription: '',
    });
      // handle success, e.g., redirect to product list or show a success message
    } catch (err) {
      // handle error, e.g., show an error message
    }
  };

  return (
    <Transition show={open}>
    <Dialog className="relative z-10 " onClose={setOpen}>
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
      <DialogPanel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl ">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 bg-black rounded">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>


    <div className = 'bg-black'>
    
    



    <div className="w-full max-w-lg px-4">
      <Fieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
        <Legend className="text-base/7 font-semibold text-white">Product details</Legend>
        <Field>
          <Label className="text-sm/6 font-medium text-white">Procuct Name :</Label>
          <Input
          type="text" id="name" name="name" value={product.name} required onChange={handleChange}
            className={clsx(
              'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
          />
        </Field>


        
      
        <Field>
          <Label className="text-sm/6 font-medium text-white">Price :</Label>
          <Input
          type="number" id="price" name="price" value={product.price} required onChange={handleChange} 
            className={clsx(
              'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
          />
        </Field>


        <Field>
          <Label className="text-sm/6 font-medium text-white">Description :</Label>
          <Description className="text-sm/6 text-white/50">
            Any description for your product?
          </Description>

          <Textarea
            id="productDescription" name="productDescription" required value={product.productDescription} onChange={handleChange}
            className={clsx( 
              'mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )
          }
            rows={3}
          />
        </Field>
        <Label className="text-sm/6 font-medium text-white">Product Image :</Label>
        <form onSubmit={handleSubmit}>
      
        <input type="file" id="image" accept="image/*" name="image" onChange={handleChange} />
      
        <Button type="button" onClick={handleSubmit} className="p-2 bg-gray-50 hover:bg-gray-200 text-black rounded">
  Add Product
</Button>
  
    </form>
      </Fieldset>
      
    </div>
    </div>

    </div>
              </DialogPanel>
              </div>
              </div>
    </Dialog>
    </Transition>
  );
}

export default AddNewProduct;
