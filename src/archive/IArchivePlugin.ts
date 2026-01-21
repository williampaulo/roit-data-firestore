/**
 * Interface for archive plugins
 * 
 * This interface defines the contract that archive plugins must implement.
 * The `firestore-archive` plugin implements this interface.
 * 
 * @example
 * ```typescript
 * import { registerArchivePlugin } from '@roit/roit-data-firestore';
 * import { createArchivePlugin } from 'firestore-archive';
 * 
 * // Register the plugin at the beginning of the application
 * registerArchivePlugin(createArchivePlugin());
 * ```
 */
export interface IArchivePlugin {
  /**
   * Checks if the archive is enabled
   */
  isEnabled(): boolean;

  /**
   * Checks if a document is archived
   */
  isDocumentArchived(doc: Record<string, unknown>): boolean;

  /**
   * Retrieves an archived document from Storage.
   *
   * @param collection - Collection name
   * @param docId - Document ID
   * @param archivePath - Full object path in Storage
   * @param expectedHash - Expected hash from Firestore stub for integrity verification (optional)
   * @returns Operation result
   */
  getArchivedDocument(params: {
    collection: string;
    docId: string;
    archivePath: string;
    expectedHash?: string;
  }): Promise<Record<string, unknown> | null>;

  /**
   * Updates an archived document (merge Storage data with new data)
   * 
   * @param collection - Collection name
   * @param docId - Document ID
   * @param newData - New data to merge
   * @param options - Options (unarchive: true to remove from Storage)
   * @param archivePath - Full object path in Storage. Required when unarchive=true
   * @returns Merged data
   */
  updateArchivedDocument(params: {
    collection: string;
    docId: string;
    newData: Record<string, unknown>;
    options?: { unarchive?: boolean };
    archivePath: string;
  }): Promise<{
    result: { success: boolean; message?: string; error?: Error };
    mergedData?: Record<string, unknown>;
  }>;

  /**
   * Deletes an archived document from Storage
   * 
   * @param collection - Collection name
   * @param docId - Document ID
   * @param archivePath - Full object path in Storage
   * @returns Operation result
   */
  deleteArchivedDocument(params: {
    collection: string;
    docId: string;
    archivePath: string;
  }): Promise<{ success: boolean; message?: string; error?: Error }>;

  /**
   * Invalidates the cache of archived documents
   * 
   * @param collection - Collection name (optional)
   * @param docId - Document ID (optional)
   */
  invalidateCache(collection?: string, docId?: string): Promise<void>;

  getArchiveHash(doc: Record<string, unknown> | null | undefined): string | undefined;
  getArchivePath(doc: Record<string, unknown> | null | undefined): string | undefined;
  isArchived(doc: Record<string, unknown> | null | undefined): boolean;
  markerKey(): string | undefined;
  debugEnabled(): boolean;
}
