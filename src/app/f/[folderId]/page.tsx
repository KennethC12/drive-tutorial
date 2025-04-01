import DriveContents from "../../drive-contents"
import { getAllParentsForFolder, getFolders, getFiles } from "~/server/db/queries"


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

    const [folders, files, parents] = await Promise.all([
        getFolders(paresedfolderId), 
        getFiles(paresedfolderId), 
        getAllParentsForFolder(paresedfolderId)])

    return <DriveContents files={files} folders={folders} parents={parents}/>
}
