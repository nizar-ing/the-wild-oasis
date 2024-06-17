import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useForm} from "react-hook-form";

import {useCreateCabin} from "./useCreateCabin.js";
import {useEditCabin} from "./useEditCabin.js";
import {FormRow} from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

function CreateCabinForm({cabinToEdit = {}}) {
    const {id: editCabinId, ...editValues} = cabinToEdit;
    const {register, handleSubmit, reset, formState, getValues} = useForm({
        defaultValues: Boolean(editCabinId) ? editValues : {}
    });
    const {isCreating, createCabin} = useCreateCabin();
    const {isEditing, editCabin} = useEditCabin(reset);

    const {errors} = formState;
    const isWorking = isCreating || isEditing;
    const onSubmit = (data) => {
        const image = typeof data.image === "string" ? data.image : data.image[0];
        if(Boolean(editCabinId)) editCabin({editCabinObj: {...data, image}, id: editCabinId}, {
            onSuccess: () => reset()
        });
        else createCabin({...data, image}, {
            onSuccess: () => reset()
        });
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
                    disabled={isWorking}
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
                    disabled={isWorking}
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
                          {...register('description', {required: 'This field is required'})}
                />
            </FormRow>
            <FormRow label="Cabin photo">
                <FileInput
                    id="image"
                    accept="image/*"
                    disabled={isWorking}
                    {...register('image', {required: Boolean(editCabinId) ? false : 'This field is required'})}
                />
            </FormRow>
            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>{ Boolean(editCabinId) ? "Edit Cabin" : "Create new cabin"}</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
