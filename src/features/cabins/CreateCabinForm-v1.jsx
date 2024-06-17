import {useMutation, useQueryClient} from "@tanstack/react-query";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm} from "react-hook-form";
import {createOrEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";
import {FormRow} from "../../ui/FormRow.jsx";

function CreateCabinForm() {
    const {register, handleSubmit, reset, formState, getValues} = useForm();
    const queryClient = useQueryClient();
    const {mutate, isLoading: isCreating} = useMutation({
        mutationFn: createOrEditCabin, //  <==> (newCabin) => createCabin(newCabin)
        onSuccess: async () => {
            toast.success("New cabin successfully created");
            await queryClient.invalidateQueries({
                queryKey: ['cabins']
            });
            reset();
        },
        onError: error => toast.error(error.message)
    });
    const {errors} = formState;

    const onSubmit = (data) => {
        mutate({...data, image: data.image[0]});
    }
    const onError = (errors) => {
        //console.log(errors); we can not use the "onError" method since we have this from the useForm hook. Perhaps we can use it for centric stuffs
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, /*onError*/)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    {...register('name',
                        {required: 'This field is required'}
                    )}
                />
            </FormRow>

            <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
                <Input
                    type="number"
                    id="maxCapacity"
                    {...register("maxCapacity",
                        {
                                required: 'This field is required',
                                min: {value: 1, message: 'capacity should be at least 1'}
                               }
                    )}
                />
            </FormRow>

            <FormRow label="Regular price" error={errors.regularPrice?.message}>
                <Input
                    type="number"
                    id="regularPrice"
                    desabled={isCreating}
                    {...register('regularPrice', {
                        required: 'This field is required',
                        min: {value: 1, message: 'capacity should be at least 1'}
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    desabled={isCreating}
                    defaultValue={0}
                    {...register('discount',
                        {required: 'This field is required',
                                validate: (value) => Number(value) <= Number(getValues().regularPrice) || "the discount should be less than the regular price"
                               }
                    )
                    }
                />
            </FormRow>

            <FormRow label="Description for website" error={errors.description?.message}>
                <Textarea type="number"
                          id="description"
                          defaultValue=""
                          desabled={isCreating}
                          {...register('description', {required: 'This field is required'})}
                />
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput
                    id="image"
                    accept="image/*"
                    disabled={isCreating}
                    {...register('image', {required: 'This field is required'})}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isCreating}>Add cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
