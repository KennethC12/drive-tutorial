import DriveContents from "../../drive-contents"
import { QUERIES } from "~/server/db/queries"


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
        QUERIES.getFolders(paresedfolderId), 
        QUERIES.getFiles(paresedfolderId), 
        QUERIES.getAllParentsForFolder(paresedfolderId)])

    return <DriveContents files={files} folders={folders} parents={parents} currentFolderId={paresedfolderId} />
}
