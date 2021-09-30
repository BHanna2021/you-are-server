# **You Are…(server)**

You are… is an app to help uplift the spirits of those using the app. There are quotes available to read. The member can add their own quotes that they have found helpful, and they can also add journal entries to help them navigate all that life has to offer.

The server was built with using npm install for the following items, followed by versions:

- express (v 4.17.1)
- nodemon (v 2.0.12)
- jsonwebtoken (v 8.5.1)
- pg (v 8.7.1)
- pg-hstore (v 2.3.4)
- sequelize (v 6.6.5)
- bcryptjs (v 2.4.3)
- dotenv (v 10.0.0)

You will need to create your own database, whether local or hosted, and create your own dotenv with your application&#39;s information, eg. DB\_DBNAME, DB\_USER, etc.

You should seed your database with an admin user that can add quotes that are marked &#39;share: true&#39; and &#39;approvedForAll: true&#39; to allow all members to search for them from the database. Further the admin can query all members and remove ones that are abusing the privilege – this will remove that user&#39;s journal entries as well.

Ultimately, this app is meant to be uplifting, reinforcing, and help people find the strength and determination to take the next step in their lives…to not give up.

This is just a start to what this app should become – future iterations may include:

- members can share quotes with other members
- ther api links being added to include the ability to search for meaningful quotes
- members can store urls for pictures and can see the pictures displayed when they login