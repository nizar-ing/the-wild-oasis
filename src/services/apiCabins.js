import supabase, {supabaseUrl} from "./supabase.js";

export async function getCabins() {
    const {data, error} = await supabase
        .from('cabins')
        .select('*');

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }
    return data;
}

export async function createOrEditCabin(newCabin, id) {
    const hasPathImage = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    // https://hbemdlujnloeaagcgkrs.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
    const imagePath = hasPathImage ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    //1. create/edit cabin
    let query = supabase.from("cabins");
    // A) Create
    if(!id) query = query.insert([{ ...newCabin, image: imagePath }]);

    // B) Edit
    if(id) query = query.update({...newCabin, image: imagePath}).eq("id", id);

    const { data, error } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be created");
    }
    //2. upload the image
    if(hasPathImage) return data;

    const { error: storageError } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image)

    //3. Delete the cabin if there was an error when uploading the image
    if(storageError){
         await supabase
            .from('cabins')
            .delete()
            .eq("id", data.id);
        console.error(storageError);
        throw new Error("Cabin image could not be uploaded and the cabin was not created");
    }
    return data;
}

export async function deleteCabin(id) {
    const {data, error} = await supabase
        .from('cabins')
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be deleted");
    }
    return data;
}
