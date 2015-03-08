package org.kub.web.common.mapmarker.model;

import java.io.Serializable;

import javax.persistence.*;

import java.sql.Timestamp;

/**
 * Entity implementation class for Entity: Marker
 *
 */
@Entity
@Table(name="Markers")
@NamedQueries({
    @NamedQuery(name="Marker.getList", query="SELECT n FROM Marker n WHERE n.categoryId = :categoryId ORDER BY n.createdDate ASC"),
    @NamedQuery(name="Marker.getListAll", query="SELECT n FROM Marker n ORDER BY n.createdDate ASC"),
    @NamedQuery(name="Marker.getCount", query="SELECT COUNT(n) FROM Marker n WHERE n.categoryId = :categoryId"),
    @NamedQuery(name="Marker.getCountAll", query="SELECT COUNT(n) FROM Marker n")
})
public class Marker implements Serializable {

	
	private long id;
	private long categoryId;
	private long utilityId;
	private long typeId;
	private long subtypeId;
	private long severityId;
	private long directionId;
	private Timestamp startDate;
	private Timestamp updateDate;
	private Timestamp endDate;
	private String description;
	private String location;
	private String street;
	private String city;
	private double latitude;
	private double longitude;
	private String specifyEnd;
	private String fromCrossStreet;
	private String endCrossStreet;
	private double endLatitude;
	private double endLongitude;
	private boolean isActive;
	private String createdBy;
	private Timestamp createdDate;
	private String editedBy;
	private Timestamp editedDate;
	private static final long serialVersionUID = 1L;

	public Marker() {
	}
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}   
	public long getCategoryId() {
		return this.categoryId;
	}

	public void setCategoryId(long categoryId) {
		this.categoryId = categoryId;
	}   
	public long getUtilityId() {
		return this.utilityId;
	}

	public void setUtilityId(long utilityTypeId) {
		this.utilityId = utilityTypeId;
	}   
	public long getTypeId() {
		return this.typeId;
	}

	public void setTypeId(long typeId) {
		this.typeId = typeId;
	}   
	public long getSubtypeId() {
		return this.subtypeId;
	}

	public void setSubtypeId(long subtypeId) {
		this.subtypeId = subtypeId;
	}   
	public long getSeverityId() {
		return this.severityId;
	}

	public void setSeverityId(long severityId) {
		this.severityId = severityId;
	}   
	public long getDirectionId() {
		return this.directionId;
	}

	public void setDirectionId(long directionId) {
		this.directionId = directionId;
	}   
	public Timestamp getStartDate() {
		return this.startDate;
	}

	public void setStartDate(Timestamp startDate) {
		this.startDate = startDate;
	}   
	public Timestamp getUpdateDate() {
		return this.updateDate;
	}

	public void setUpdateDate(Timestamp updateDate) {
		this.updateDate = updateDate;
	}   
	public Timestamp getEndDate() {
		return this.endDate;
	}

	public void setEndDate(Timestamp endDate) {
		this.endDate = endDate;
	}   
	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}   
	public String getLocation() {
		return this.location;
	}

	public void setLocation(String location) {
		this.location = location;
	}   
	public String getStreet() {
		return this.street;
	}

	public void setStreet(String street) {
		this.street = street;
	}   
	public String getCity() {
		return this.city;
	}

	public void setCity(String city) {
		this.city = city;
	}   
	public double getLatitude() {
		return this.latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}   
	public double getLongitude() {
		return this.longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}   
	public String getSpecifyEnd() {
		return this.specifyEnd;
	}

	public void setSpecifyEnd(String specifyEnd) {
		this.specifyEnd = specifyEnd;
	}   
	public String getFromCrossStreet() {
		return this.fromCrossStreet;
	}

	public void setFromCrossStreet(String fromCrossStreet) {
		this.fromCrossStreet = fromCrossStreet;
	}   
	public String getEndCrossStreet() {
		return this.endCrossStreet;
	}

	public void setEndCrossStreet(String endCrossStreet) {
		this.endCrossStreet = endCrossStreet;
	}   
	public double getEndLatitude() {
		return this.endLatitude;
	}

	public void setEndLatitude(double endLatitude) {
		this.endLatitude = endLatitude;
	}   
	public double getEndLongitude() {
		return this.endLongitude;
	}

	public void setEndLongitude(double endLongitude) {
		this.endLongitude = endLongitude;
	}   
	public boolean getIsActive() {
		return this.isActive;
	}

	public void setIsActive(boolean isActive) {
		this.isActive = isActive;
	}   
	public String getCreatedBy() {
		return this.createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}   
	public Timestamp getCreatedDate() {
		return this.createdDate;
	}

	public void setCreatedDate(Timestamp createdDate) {
		this.createdDate = createdDate;
	}   
	public String getEditedBy() {
		return this.editedBy;
	}

	public void setEditedBy(String editedBy) {
		this.editedBy = editedBy;
	}   
	public Timestamp getEditedDate() {
		return this.editedDate;
	}

	public void setEditedDate(Timestamp editedDate) {
		this.editedDate = editedDate;
	}

	
}
