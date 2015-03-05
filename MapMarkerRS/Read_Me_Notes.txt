Errors:

Marker is currently not working.  This is the entity I created by hand, but I cannot find anything that is incorrect.

There is no Java error thrown but it fails to get the data.


Settings:

Server.xml changes: see the image file Server_XML_Changes.PNG

My settings, if you want to copy/paste and edit as needed.

	<dataSource commitOrRollbackOnCleanup="rollback" id="MapMarkerDatabase" isolationLevel="TRANSACTION_READ_COMMITTED" jndiName="jdbc/markers" queryTimeout="60" supplementalJDBCTrace="true" syncQueryTimeoutWithTransactionTimeout="true" type="javax.sql.ConnectionPoolDataSource">
	    <jdbcDriver javax.sql.ConnectionPoolDataSource="com.microsoft.sqlserver.jdbc.SQLServerConnectionPoolDataSource">
	        <library filesetRef="MicrosoftSQLServerDriverPath" name="MicrosoftSQLServerDriverLib"/>
	    </jdbcDriver>
	    <connectionManager agedTimeout="0" maxIdleTime="1800s" maxPoolSize="10" minPoolSize="1" reapTime="180s"/>
	    <properties.microsoft.sqlserver databaseName="MapMarker" password="{xor}Lz4sLCgwLTs=" serverName="W7VIRTUALBOX-PC\SQLEXPRESS" user="testuser"/>
	</dataSource>
	