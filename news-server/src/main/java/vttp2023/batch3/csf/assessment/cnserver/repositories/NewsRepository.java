package vttp2023.batch3.csf.assessment.cnserver.repositories;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;
import vttp2023.batch3.csf.assessment.cnserver.models.News;
import vttp2023.batch3.csf.assessment.cnserver.models.TagCount;

import java.util.List;

@Repository
public class NewsRepository {

    @Autowired
    private MongoTemplate template;

    /*
       db.news.insert({
        postDate: NumberLong(1742290601316),
        title: "title",
        description: "description",
        image: "imageUrl",
        tags: "hello"
    })
    */
	// TODO: Task 1 
	// Write the native Mongo query in the comment above the method
    public String insertNews(String title, String description, String imageUrl,String tagsString) {

        // Regex to split one or more white spaces
        String[] tagsToInsert = tagsString.toLowerCase().trim().split("\\s+");

        Document doc = new Document();
        doc.append("postDate", System.currentTimeMillis());
        doc.put("title", title);
        doc.put("description", description);
        doc.put("imageUrl", imageUrl);
        if (tagsToInsert.length > 0){
            doc.put("tags", tagsToInsert);
        }
        template.save(doc,"news");
        System.out.println(doc.toString());

        return doc.getObjectId("_id").toString();
    }


  /*  db.news.aggregate([
    {$match: {
            tags:{$exists:true, $ne: null},
            postDate: { $gte: 1081018501-60000 } }
    },
    { $unwind: "$tags" },
    { $group: { _id: "$tags",count: {$sum:1} } },
    { $project: { _id:0, tag: "$_id", count:1 } },
    { $sort: { count:-1 } },
    { $limit:10 }
    ])
    */
	// TODO: Task 2 
	// Write the native Mongo query in the comment above the method
    public List<TagCount> getTags(int timeInMinutes) {
        // convert minutes to milliseconds
        int time = timeInMinutes * 60000;
        MatchOperation matchQuery = Aggregation.match(Criteria.where("tags").exists(true).ne(null)
                .and("postDate").gte(System.currentTimeMillis() - time));

        UnwindOperation unwindTags = Aggregation.unwind("tags");
        GroupOperation groupByTags = Aggregation.group("tags").count().as("count");
        ProjectionOperation projectTags = Aggregation.project("count")
                .and("_id").as("tag")
                .andExclude("_id");
        SortOperation sortByDesc = Aggregation.sort(Sort.by(Sort.Direction.DESC, "count"));
        LimitOperation limit = Aggregation.limit(10);

        Aggregation pipeline = Aggregation.newAggregation(matchQuery, unwindTags,
                groupByTags, projectTags, sortByDesc, limit);

        return template.aggregate(pipeline,"news", TagCount.class).getMappedResults();
    }


	// TODO: Task 3
	// Write the native Mongo query in the comment above the method


}
