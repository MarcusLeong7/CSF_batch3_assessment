package vttp2023.batch3.csf.assessment.cnserver.repositories;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.io.InputStream;
import java.util.UUID;

@Repository
public class ImageRepository {

	
	// TODO: Task 1
    @Autowired
    private AmazonS3 s3Client;

    @Value("${s3.bucket.region}")
    private String bucket;

    @Value("${s3.bucket.endpoint}")
    private String endPoint;

    public String uploadImage(String contentType, InputStream is) {
        String id = UUID.randomUUID().toString().substring(0, 8);
        String s3Key = "csf_assessment/%s".formatted(id);

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(contentType);

        PutObjectRequest putReq = new PutObjectRequest(bucket, s3Key, is, metadata);
        putReq = putReq.withCannedAcl(CannedAccessControlList.PublicRead);

        s3Client.putObject(putReq);

        return "https://%s.%s/%s".formatted(bucket,endPoint,s3Key);
    }
}
