import { db } from "~/server/db"
import { files as filesSchema, folders as foldersSchema} from "~/server/db/schema"
import DriveContents from "../../drive-contents"
import { z } from "zod"
import { eq } from "drizzle-orm"
export default async function GoogleDriveClone( props:
    {
        params: Promise<{ folderId: string}>;
    }

) {
    const params = await props.params;

    const paresedfolderId = parseInt(params.folderId);
        if (isNaN(paresedfolderId)) {
            return <div>Invaild Folder ID</div>
        }


    const files = await db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parent, paresedfolderId))

    const folders = await db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parent, paresedfolderId))

    return <DriveContents files = {files} folders={folders}/>
}
