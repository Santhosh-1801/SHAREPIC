import  { createClient } from "@sanity/client"
import imageurlBuilder from "@sanity/image-url"

export const client=createClient({
    projectId:'e33yuxh0',
    dataset:'production',
    apiVersion:'2021-10-21',
    useCdn:false,
    token:'sko1Qrp1ZySq59DpGcnEA74I8ZzGg7InMnGkUCZpaxF5ELy8B5W6rdPsitL2DOM8YTMsEFtrIqyM5Gbboa5Ku41HdX55si9equrOGGqV5TRh4PhYR8jlxeKnKGrm7sXbYvLG3NGxE7wR2rLlBE75TWnsrXjEJRhs9FSIWVDxBCu7vQHGL1i7'

})
const builder=imageurlBuilder(client)
export const urlFor=(source)=>builder.image(source);
