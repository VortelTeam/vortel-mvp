/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class DefaultService {
  /**
   * List all files for the authenticated user
   * @returns string Successfully retrieved file list
   * @throws ApiError
   */
  public static getFiles(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/files",
      responseHeader: "Access-Control-Allow-Origin",
      errors: {
        403: `Unauthorized`,
        500: `Internal server error`,
      },
    });
  }
  /**
   * CORS support
   * Enable CORS by returning correct headers
   * @returns string Default response for CORS method
   * @throws ApiError
   */
  public static optionsFiles(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "OPTIONS",
      url: "/files",
      responseHeader: "Access-Control-Allow-Origin",
    });
  }
  /**
   * Get pre-signed URL for file upload with metadata
   * Generates a pre-signed URL for direct S3 upload with embedded metadata.
   * Client-provided metadata will be stored with the file in S3.
   *
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static postUploadUrl(requestBody: {
    /**
     * Original file name for the upload
     */
    fileName: string;
    /**
     * MIME type of the file
     */
    contentType: string;
    /**
     * Optional key-value pairs of custom metadata
     */
    metadata?: Record<string, string>;
  }): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/upload-url",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Bad request (missing required fields or invalid JSON)`,
        403: `Unauthorized request`,
        500: `Internal server error`,
      },
    });
  }
  /**
   * Delete a specific file
   * @param filename
   * @returns string File deleted successfully
   * @throws ApiError
   */
  public static deleteFiles(filename: string): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/files/{filename}",
      path: {
        filename: filename,
      },
      responseHeader: "Access-Control-Allow-Origin",
      errors: {
        403: `Unauthorized`,
        404: `File not found`,
        500: `Internal server error`,
      },
    });
  }
  /**
   * CORS support
   * Enable CORS by returning correct headers
   * @returns string Default response for CORS method
   * @throws ApiError
   */
  public static optionsFiles1(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "OPTIONS",
      url: "/files/{filename}",
      responseHeader: "Access-Control-Allow-Origin",
    });
  }
  /**
   * Submit a batch inference job
   * @param requestBody
   * @returns string Job submitted successfully
   * @throws ApiError
   */
  public static postJobs(requestBody: {
    files?: Array<string>;
  }): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/jobs",
      body: requestBody,
      mediaType: "application/json",
      responseHeader: "Access-Control-Allow-Origin",
      errors: {
        403: `Unauthorized`,
        500: `Internal server error`,
      },
    });
  }
  /**
   * List all jobs for the authenticated user
   * @returns string Successfully retrieved job list
   * @throws ApiError
   */
  public static getJobs(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/jobs",
      responseHeader: "Access-Control-Allow-Origin",
      errors: {
        403: `Unauthorized`,
        500: `Internal server error`,
      },
    });
  }
  /**
   * CORS support
   * Enable CORS by returning correct headers
   * @returns string Default response for CORS method
   * @throws ApiError
   */
  public static optionsJobs(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "OPTIONS",
      url: "/jobs",
      responseHeader: "Access-Control-Allow-Origin",
    });
  }
  /**
   * Download a specific file in JSON or CSV format
   * @param jobId
   * @param format Format to download the file (json or csv)
   * @returns any Successfully retrieved file
   * @throws ApiError
   */
  public static getJobsDownload(
    jobId: string,
    format: "json" | "csv" = "json"
  ): CancelablePromise<{
    /**
     * URL to download the file
     */
    presigned_url?: string;
    /**
     * Format of the file
     */
    format?: "json" | "csv";
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/jobs/{job_id}/download",
      path: {
        job_id: jobId,
      },
      query: {
        format: format,
      },
      errors: {
        403: `Unauthorized`,
        404: `File not found`,
        500: `Internal server error`,
      },
    });
  }
  /**
   * CORS support
   * Enable CORS by returning correct headers
   * @returns string Default response for CORS method
   * @throws ApiError
   */
  public static optionsJobsDownload(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "OPTIONS",
      url: "/jobs/{job_id}/download",
      responseHeader: "Access-Control-Allow-Origin",
    });
  }
}
