"use client"

import { Folder, FileIcon, Upload, ChevronRight } from "lucide-react"
import Link from "next/link"
import { FileRow, FolderRow } from "./file-row"
import type { files_table, folders_table } from '~/server/db/schema'
import { UploadButton } from "../components/uploadthing";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { useRouter } from "next/navigation";

export default function GoogleDriveClone(
  props: {
    files: (typeof files_table.$inferSelect)[];
    folders: (typeof folders_table.$inferSelect)[];
    parents: (typeof folders_table.$inferSelect)[];

    currentFolderId: number;
  }) {
  
  const naviage = useRouter();


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link
              href={`/f/1`}
              className="text-gray-300 hover:text-white mr-2"
            >
              My Drive
            </Link>
            {props.parents.map((folder, index) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link
                  href = {`/f/${folder.id}`}
                  className="text-gray-300 hover:text-white"
                >
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <SignedOut>
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-xl">
          <div className="px-6 py-4 border-b border-gray-700">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Size</div>
            </div>
          </div>
          <ul>
            {props.folders.map((folder) => (
              <FolderRow key={folder.id} folder= {folder}/>
            ))}
            {props.files.map((file) => (
              <FileRow key={file.id} file= {file} />
            ))}
          </ul>
        </div>
        <UploadButton endpoint="imageUploader" onClientUploadComplete={() => naviage.refresh()} input={{folderId: props.currentFolderId}}/>
      </div>
    </div>
  )
}

