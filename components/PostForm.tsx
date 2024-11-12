"use client";

import React, { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/actions";

const PostForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);
      const result = await createPost(formValues, formData, pitch);
      console.log(result);
      if (result.status == "SUCCESS") {
        toast({
          title: "Post Submitted",
          description: "Your post has been created sucessfully!",
        });

        router.push(`/post/${result?._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Plese check your inputs and try again!",
          variant: "destructive",
        });
        return { ...prevState, error: "Validation Failed.", status: "ERROR" };
      }
      toast({
        title: "Error",
        description: "Unexpected Error!",
        variant: "destructive",
      });
      return { ...prevState, error: "Unexpected Error.", status: "ERROR" };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className='post-form'>
      <div>
        <label htmlFor='title' className='post-form_label'>
          Title
        </label>
        <Input
          id='title'
          name='title'
          required
          placeholder='Post Title'
          className='post-form_input'
        />
        {errors.title && (
          <span className='post-form_error'>{errors.title}</span>
        )}
      </div>
      <div>
        <label htmlFor='description' className='post-form_label'>
          Description
        </label>
        <Textarea
          id='description'
          name='description'
          required
          placeholder='Description'
          className='post-form_textarea'
        />
        {errors.description && (
          <span className='post-form_error'>{errors.description}</span>
        )}
      </div>
      <div>
        <label htmlFor='category' className='post-form_label'>
          Category
        </label>
        <Input
          id='category'
          name='category'
          required
          placeholder='Post Category (Blog, Guide, Ideas...)'
          className='post-form_input'
        />
        {errors.category && (
          <span className='post-form_error'>{errors.category}</span>
        )}
      </div>
      <div>
        <label htmlFor='link' className='post-form_label'>
          Image url
        </label>
        <Input
          id='link'
          name='link'
          required
          placeholder='Thumbnail Image Url'
          className='post-form_input'
        />
        {errors.link && <span className='post-form_error'>{errors.link}</span>}
      </div>
      <div data-color-mode='light'>
        <label htmlFor='pitch' className='post-form_label'>
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id='pitch'
          preview='edit'
          height={350}
          textareaProps={{
            placeholder: "Write a blog post main information here...",
          }}
          previewOptions={{ disallowedElements: ["style"] }}
          style={{ borderRadius: 20, overflow: "hidden" }}
        />
        {errors.pitch && (
          <span className='post-form_error'>{errors.pitch}</span>
        )}
      </div>
      <Button
        type='submit'
        className='post-form_btn text-white-100'
        disabled={isPending}
      >
        {isPending ? "Submitting your post..." : "Submit Post"}
        <Send className='size-6 ml-2' />
      </Button>
    </form>
  );
};

export default PostForm;
