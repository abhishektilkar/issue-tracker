'use client';

import { Button, TextField } from '@radix-ui/themes';
import React from 'react';  
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
    title: string;
    description: string;
}

// Dynamically import SimpleMDE only on the client side
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit } = useForm<IssueForm>();

    return (
        <form className='max-w-xl space-y-3' 
            onSubmit={handleSubmit(async (data) => {
                console.log(data);
                await axios.post('/api/issues', data);
                router.push('/issues');
            })}
        >
            <TextField.Root placeholder='Title' {...register('title')} />
            <Controller
                name='description'
                control={control}
                render={({ field }) => <SimpleMDE {...field} />}
            />
            <Button type="submit">Create</Button>
        </form>
    );
};

export default NewIssuePage;
